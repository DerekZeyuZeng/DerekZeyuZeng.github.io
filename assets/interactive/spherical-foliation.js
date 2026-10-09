/* Exact model helpers are also available to non-browser checks. */
(function (root) {
  'use strict';

  function radiusFromLevel(c) {
    if (!Number.isFinite(c) || c < 0) throw new RangeError('A spherical leaf requires a finite level c >= 0.');
    return Math.sqrt(2 * c);
  }

  function dimensionFromLevel(c) {
    if (!Number.isFinite(c)) throw new RangeError('The level must be finite.');
    return c < 0 ? null : c === 0 ? 0 : 2;
  }

  function levelOf(point) {
    return point.reduce((sum, coordinate) => sum + coordinate * coordinate, 0) / 2;
  }

  function rotationFields([x, y, z]) {
    return [[-y, x, 0], [-z, 0, x], [0, -z, y]];
  }

  function gradientTrajectory(point, time) {
    return point.map(coordinate => Math.exp(-time) * coordinate);
  }

  function sphereGrid(radius, cutaway = false, latitudes = 36, longitudes = 72) {
    if (!Number.isFinite(radius) || radius < 0) throw new RangeError('The radius must be finite and nonnegative.');
    if (!Number.isInteger(latitudes) || latitudes < 3 || !Number.isInteger(longitudes) || longitudes < 6) {
      throw new RangeError('A sphere grid needs at least 3 latitude and 6 longitude intervals.');
    }
    const start = cutaway ? Math.PI / 2 : 0;
    const span = 2 * Math.PI - start;
    const grid = {x: [], y: [], z: []};
    for (let i = 0; i <= latitudes; i += 1) {
      const phi = Math.PI * i / latitudes;
      const ring = radius * Math.sin(phi);
      const xs = [], ys = [], zs = [];
      for (let j = 0; j <= longitudes; j += 1) {
        const theta = start + span * j / longitudes;
        xs.push(ring * Math.cos(theta));
        ys.push(ring * Math.sin(theta));
        zs.push(radius * Math.cos(phi));
      }
      grid.x.push(xs);
      grid.y.push(ys);
      grid.z.push(zs);
    }
    return grid;
  }

  const math = Object.freeze({radiusFromLevel, dimensionFromLevel, levelOf, rotationFields, gradientTrajectory, sphereGrid});
  root.SphericalFoliationMath = math;
  if (typeof module !== 'undefined' && module.exports) module.exports = math;
  if (typeof document === 'undefined') return;

  const byId = id => document.getElementById(id);
  const gd = byId('foliation-plot');
  if (!gd) return;
  const plotWrap = document.querySelector('.plot-wrap');
  const levelSlider = byId('level');
  const levelInput = byId('level-value');
  const playButton = byId('play');
  const initialCamera = {eye: {x: 0.95, y: 1.01, z: 0.62}, up: {x: 0, y: 0, z: 1}, center: {x: 0, y: 0, z: 0}, projection: {type: 'perspective'}};
  const copyCamera = camera => JSON.parse(JSON.stringify(camera));
  let camera = copyCamera(initialCamera);
  let level = 1;
  let rendering = false;
  let pendingRender = false;
  let cameraListenerAttached = false;
  let playing = false;
  let animationFrame = null;
  let animationStart = 0;
  let animationPhase = 0;
  let lastFrame = 0;
  let controlFrame = null;
  const referenceLevels = [0.16, 0.49, 1.69];
  const referenceColors = ['#b49770', '#8883aa', '#7d9fb1'];
  const referenceCache = new Map();

  function sphereTrace(c, color, cutaway, selected) {
    return {
      ...sphereGrid(radiusFromLevel(c), cutaway),
      type: 'surface', uid: selected ? 'selected-leaf' : 'reference-' + c,
      name: 'Spherical leaf, c = ' + c.toFixed(2),
      colorscale: [[0, color], [1, color]], showscale: false, showlegend: false,
      opacity: cutaway ? 1 : (selected ? 0.52 : 0.18),
      hoverinfo: 'skip',
      lighting: {ambient: 0.62, diffuse: 0.72, specular: 0.18, roughness: 0.76, fresnel: 0.08},
      lightposition: {x: 30, y: 40, z: 60},
      contours: {x: {show: false}, y: {show: false}, z: {show: false}}
    };
  }

  function referenceTrace(c, color, cutaway) {
    const key = c + '-' + cutaway;
    if (!referenceCache.has(key)) referenceCache.set(key, sphereTrace(c, color, cutaway, false));
    const source = referenceCache.get(key);
    return {...source, lighting: {...source.lighting}, lightposition: {...source.lightposition}};
  }

  function gradientTraces() {
    const directions = [[1, 0.35, 0.4], [0.3, 1, -0.4], [-0.8, 0.5, 0.8], [0.4, -0.9, 0.5], [-0.5, -0.6, -0.8], [0.25, 0.2, 1]];
    const lines = {x: [], y: [], z: []};
    const cones = {x: [], y: [], z: [], u: [], v: [], w: []};
    for (const direction of directions) {
      const norm = Math.hypot(...direction);
      const unit = direction.map(value => value / norm);
      for (let axis = 0; axis < 3; axis += 1) {
        lines[['x', 'y', 'z'][axis]].push(0.06 * unit[axis], 2.08 * unit[axis], null);
        cones[['x', 'y', 'z'][axis]].push(1.55 * unit[axis]);
        cones[['u', 'v', 'w'][axis]].push(-unit[axis]);
      }
    }
    return [
      {...lines, type: 'scatter3d', uid: 'gradient-paths', mode: 'lines', line: {color: '#b07a42', width: 3, dash: 'dash'}, hoverinfo: 'skip', showlegend: false, name: 'Negative gradient paths (not leaves)'},
      {...cones, type: 'cone', uid: 'gradient-arrows', colorscale: [[0, '#b07a42'], [1, '#b07a42']], sizemode: 'absolute', sizeref: 0.11, anchor: 'center', hoverinfo: 'skip', showscale: false, showlegend: false}
    ];
  }

  function traces() {
    const cutaway = byId('cutaway').checked;
    const data = [];
    if (byId('all-leaves').checked) {
      referenceLevels.forEach((c, i) => {
        if (Math.abs(c - level) > 0.005) data.push(referenceTrace(c, referenceColors[i], cutaway));
      });
    }
    if (level > 0) data.push(sphereTrace(level, '#4d9082', cutaway, true));
    if (byId('gradient').checked) data.push(...gradientTraces());
    data.push({
      type: 'scatter3d', uid: 'singular-origin', x: [0], y: [0], z: [0], mode: 'markers+text',
      marker: {size: level === 0 ? 8 : 6, color: '#bb684d', line: {color: '#fff', width: 1}},
      text: ['0'], textposition: 'bottom center', textfont: {family: 'Georgia, serif', size: 15, color: '#9a4e38'},
      hovertemplate: 'Origin · zero-dimensional singular leaf<extra></extra>', name: 'Singular leaf {0}', showlegend: false
    });
    return data;
  }

  function updateReadout(announce = false) {
    const c = level.toFixed(2);
    const radius = radiusFromLevel(level);
    levelSlider.value = String(level);
    levelSlider.setAttribute('aria-valuetext', 'c = ' + c + (level === 0 ? ', singular point, dimension zero' : ', sphere of radius ' + radius.toFixed(3)));
    levelInput.value = c;
    byId('leaf-title').textContent = level === 0 ? 'f⁻¹(0) = {0}' : 'f⁻¹(' + c + ') = S² of radius √' + (2 * level).toFixed(2);
    byId('dimension').textContent = level === 0 ? 'Dimension 0 · singular leaf' : 'Dimension 2 · regular leaf';
    byId('description').textContent = level === 0
      ? 'The selected leaf is exactly the origin: one point, radius zero. The two-dimensional spherical leaves accumulate at this singular leaf.'
      : 'The selected leaf is a sphere centered at the origin. Its radius is √(2c) ≈ ' + radius.toFixed(3) + '.';
    byId('drawing-note').textContent = byId('cutaway').checked
      ? 'A quarter is omitted to reveal the interior; every spherical leaf is complete.'
      : 'Complete spherical leaves · transparency reveals their nesting.';
    byId('reference-legend').hidden = !byId('all-leaves').checked;
    byId('selected-legend').hidden = level === 0;
    byId('gradient-legend').hidden = !byId('gradient').checked;
    byId('motion-note').textContent = byId('gradient').checked
      ? 'Dashed radial paths cross the spherical leaves toward the origin. They are gradient trajectories, not leaves.'
      : 'Different spheres are different leaves. The orange point is always the separate zero-dimensional leaf.';
    gd.setAttribute('aria-label', level === 0 ? 'The selected leaf is the singular point at the origin.' : 'Selected spherical leaf at level ' + c + ', radius ' + radius.toFixed(3) + ', with the singular origin marked.');
    if (announce) byId('status').textContent = byId('leaf-title').textContent + '. ' + byId('dimension').textContent + '.';
  }

  function renderFailure() {
    stopAnimation(false);
    byId('load-error').hidden = false;
    plotWrap.hidden = true;
    playButton.disabled = true;
  }

  async function render() {
    if (!root.Plotly) { renderFailure(); return; }
    pendingRender = true;
    if (rendering) return;
    rendering = true;
    try {
      while (pendingRender) {
        pendingRender = false;
        const axis = {visible: false, range: [-2.15, 2.15], autorange: false, showbackground: false};
        await root.Plotly.react(gd, traces(), {
          autosize: true, margin: {l: 0, r: 0, t: 0, b: 0}, paper_bgcolor: '#fff', showlegend: false,
          uirevision: 'spherical-foliation',
          scene: {xaxis: {...axis}, yaxis: {...axis}, zaxis: {...axis}, aspectmode: 'cube',
            camera: copyCamera(camera), uirevision: 'spherical-foliation', dragmode: 'orbit', bgcolor: '#fff'}
        }, {displayModeBar: false, responsive: true, scrollZoom: false});
        byId('load-error').hidden = true;
        if (!cameraListenerAttached) {
          gd.on('plotly_relayout', event => {
            if (Object.keys(event).some(key => key.startsWith('scene.camera')) && gd._fullLayout?.scene?.camera) {
              camera = copyCamera(gd._fullLayout.scene.camera);
            }
          });
          gd.on('plotly_webglcontextlost', renderFailure);
          cameraListenerAttached = true;
        }
      }
    } catch (error) {
      renderFailure();
      console.error('Unable to render the spherical foliation:', error);
    } finally {
      rendering = false;
    }
  }

  function selectLevel(value, announce = false) {
    if (!Number.isFinite(value)) return;
    level = Math.round(Math.max(0, Math.min(2, value)) * 100) / 100;
    updateReadout(announce);
    if (controlFrame !== null) cancelAnimationFrame(controlFrame);
    controlFrame = requestAnimationFrame(() => { controlFrame = null; void render(); });
  }

  function stopAnimation(announce = true) {
    playing = false;
    if (animationFrame !== null) cancelAnimationFrame(animationFrame);
    animationFrame = null;
    playButton.textContent = '▶ Let it breathe';
    playButton.setAttribute('aria-pressed', 'false');
    if (announce) byId('status').textContent = 'Breathing paused at c = ' + level.toFixed(2) + '.';
  }

  function animate(time) {
    if (!playing) return;
    // A full radius cycle lasts eight seconds; updates follow the slider's .01 step.
    if (time - lastFrame >= 65 && !rendering) {
      const radius = 1 - Math.cos(animationPhase + (time - animationStart) * Math.PI / 4000);
      selectLevel(radius * radius / 2);
      lastFrame = time;
    }
    animationFrame = requestAnimationFrame(animate);
  }

  playButton.addEventListener('click', () => {
    if (playing) { stopAnimation(); return; }
    playing = true;
    animationPhase = Math.acos(1 - radiusFromLevel(level));
    animationStart = performance.now();
    lastFrame = 0;
    playButton.textContent = 'Ⅱ Pause breathing';
    playButton.setAttribute('aria-pressed', 'true');
    byId('status').textContent = 'Breathing started. The selected level varies; this is not a gradient trajectory.';
    animationFrame = requestAnimationFrame(animate);
  });
  levelSlider.addEventListener('input', () => { stopAnimation(false); selectLevel(Number(levelSlider.value)); });
  levelSlider.addEventListener('change', () => updateReadout(true));
  levelInput.addEventListener('change', () => {
    stopAnimation(false);
    if (levelInput.value === '' || !levelInput.checkValidity()) { levelInput.reportValidity(); return; }
    selectLevel(Number(levelInput.value), true);
  });
  byId('zero').addEventListener('click', () => { stopAnimation(false); selectLevel(0, true); });
  for (const id of ['cutaway', 'all-leaves', 'gradient']) byId(id).addEventListener('change', () => { updateReadout(); void render(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopAnimation(false); });
  root.matchMedia?.('(prefers-reduced-motion: reduce)').addEventListener('change', event => { if (event.matches) stopAnimation(); });

  async function setCamera(next) {
    camera = copyCamera(next);
    if (!root.Plotly || !gd._fullLayout) return;
    try { await root.Plotly.relayout(gd, {'scene.camera': camera}); }
    catch (error) { console.error('Unable to update the foliation camera:', error); }
  }
  byId('reset').addEventListener('click', () => { void setCamera(initialCamera); });
  function zoom(factor) {
    const next = copyCamera(camera);
    for (const axis of ['x', 'y', 'z']) next.eye[axis] *= factor;
    void setCamera(next);
  }
  byId('zoom-in').addEventListener('click', () => zoom(0.84));
  byId('zoom-out').addEventListener('click', () => zoom(1 / 0.84));
  if (root.ResizeObserver) new root.ResizeObserver(() => {
    if (root.Plotly && gd.data && !plotWrap.hidden) root.Plotly.Plots.resize(gd).catch(() => {});
  }).observe(plotWrap);

  updateReadout();
  void render();
})(globalThis);

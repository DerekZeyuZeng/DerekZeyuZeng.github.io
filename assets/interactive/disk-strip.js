/* A disk-to-strip biholomorphism. All angles in the pure API are radians.
 * Complex numbers are {re, im}. No DOM or dependency is needed for the API. */
(function (root) {
  'use strict';
  const PI = Math.PI;
  const complex = (re, im = 0) => ({ re, im });
  const add = (a, b) => complex(a.re + b.re, a.im + b.im);
  const sub = (a, b) => complex(a.re - b.re, a.im - b.im);
  const mul = (a, b) => complex(a.re*b.re - a.im*b.im, a.re*b.im + a.im*b.re);
  const conjugate = a => complex(a.re, -a.im);
  const abs = a => Math.hypot(a.re, a.im);
  const scale = (a, k) => complex(a.re*k, a.im*k);
  const polar = (radius, angle) => complex(radius*Math.cos(angle), radius*Math.sin(angle));
  const finite = a => Boolean(a && Number.isFinite(a.re) && Number.isFinite(a.im));
  function div(a, b) {
    if (b.re === 0 && b.im === 0) throw new RangeError('Complex division by zero.');
    // Smith division avoids squaring a very large or small denominator.
    if (Math.abs(b.re) >= Math.abs(b.im)) {
      const ratio = b.im/b.re, d = b.re + b.im*ratio;
      return complex((a.re + a.im*ratio)/d, (a.im - a.re*ratio)/d);
    }
    const ratio = b.re/b.im, d = b.im + b.re*ratio;
    return complex((a.re*ratio + a.im)/d, (a.im*ratio - a.re)/d);
  }
  const exp = a => polar(Math.exp(a.re), a.im);
  function log(a) {
    if (!finite(a) || abs(a) === 0) throw new RangeError('Log needs a finite, nonzero argument.');
    return complex(Math.log(abs(a)), Math.atan2(a.im, a.re));
  }
  function validate(a, b, phi) {
    if (!finite(a) || abs(a) >= 1) throw new RangeError('The source a must lie in the open unit disk.');
    if (!finite(b) || Math.abs(b.im) >= 1) throw new RangeError('The target b must lie in the open strip |Im b| < 1.');
    if (!Number.isFinite(phi)) throw new RangeError('The derivative angle must be finite.');
  }
  function createMap(a, b, phi = 0) {
    validate(a, b, phi);
    a = complex(a.re, a.im); b = complex(b.re, b.im);
    const eta = PI*b.im/2, c = Math.cos(eta), s = Math.sin(eta);
    const rotation = polar(1, eta + phi), undo = conjugate(rotation), one = complex(1);
    const undoDisk = zeta => div(add(a, zeta), add(one, mul(conjugate(a), zeta)));
    function forward(z) {
      if (!finite(z) || abs(z) >= 1) throw new RangeError('z must lie in the open unit disk.');
      const denominator = sub(one, mul(conjugate(a), z));
      const q = mul(rotation, div(sub(z, a), denominator));
      const delta = sub(one, q), d2 = delta.re*delta.re + delta.im*delta.im;
      // The positive real part is evaluated with the disk-automorphism
      // identity, avoiding cancellation in 1 - |q|^2 close to the circle.
      const defect = (1 - abs(a))*(1 + abs(a))*(1 - abs(z))*(1 + abs(z));
      const denom2 = denominator.re*denominator.re + denominator.im*denominator.im;
      const h = complex(c*defect/(denom2*d2), c*2*q.im/d2 + s);
      if (!(h.re > 0) || !finite(h)) throw new RangeError('Point is too close to a boundary end for this drawing.');
      const value = scale(log(h), 2/PI);
      return complex(b.re + value.re, value.im);
    }
    function inverse(w) {
      if (!finite(w) || Math.abs(w.im) >= 1) throw new RangeError('w must lie in the open strip.');
      const t = scale(complex(w.re - b.re, w.im), PI/2);
      let q;
      // Use exp(-t) on the right to avoid overflow at distant strip points.
      if (t.re >= 0) {
        const e = exp(scale(t, -1));
        q = div(sub(one, mul(complex(c, s), e)), add(one, mul(complex(c, -s), e)));
      } else {
        const e = exp(t);
        q = div(sub(e, complex(c, s)), add(e, complex(c, -s)));
      }
      return undoDisk(mul(undo, q));
    }
    function derivativeAtSource() {
      return polar(4*c/(PI*(1 - abs(a))*(1 + abs(a))), phi);
    }
    // Boundary ends solve H=0 and H=infinity. H=0 is not generally q=-1.
    const negativeQ = div(complex(-c, -s), complex(c, -s));
    return { a, b, phi, eta, forward, inverse, derivativeAtSource,
      ends: { negative: undoDisk(mul(undo, negativeQ)), positive: undoDisk(undo) } };
  }
  const api = { complex, add, sub, mul, div, conjugate, abs, scale, polar, exp, log,
    createMap,
    forward: (z, a, b, phi = 0) => createMap(a, b, phi).forward(z),
    inverse: (w, a, b, phi = 0) => createMap(a, b, phi).inverse(w),
    normalizedDerivative: (a, b, phi = 0) => createMap(a, b, phi).derivativeAtSource() };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.DiskStripMath = api;
  if (typeof document === 'undefined') return;

  function initialize() {
    if (!document.getElementById('disk-strip-app')) return;
    const $ = id => document.getElementById(id);
    const ns = 'http://www.w3.org/2000/svg';
    const state = { a: complex(0), b: complex(0), phi: 0, probe: complex(.42, .28) };
    let map = createMap(state.a, state.b, state.phi), pending = false;
    const circleColors = ['#7aa99a', '#639f91', '#4d9388', '#39867d', '#297a73', '#226e68'];
    const rayColors = ['#b28b4b', '#c29b5f', '#ab824b', '#c5a36d', '#ad8959', '#bb9456'];
    const diskXY = z => [220 + 137*z.re, 168 - 137*z.im];
    const stripXY = w => [220 + 49*(w.re - state.b.re), 168 - 49*w.im];
    function element(tag, attrs, parent, text) {
      const node = document.createElementNS(ns, tag);
      Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, String(value)));
      if (text !== undefined) node.textContent = text;
      parent.appendChild(node); return node;
    }
    function clear(id) { $(id).replaceChildren(); return $(id); }
    function format(x) { return Math.abs(x) < .00005 ? '0' : x.toFixed(3).replace(/0+$/, '').replace(/\.$/, ''); }
    function formatComplex(z) {
      if (Math.abs(z.im) < .00005) return format(z.re);
      return format(z.re) + (z.im < 0 ? ' − ' : ' + ') + format(Math.abs(z.im)) + 'i';
    }
    function status(message, error = false) {
      $('status').textContent = message; $('status').classList.toggle('error', error);
    }
    function syncInputs() {
      for (const [id, value] of [['ar', state.a.re], ['ai', state.a.im], ['br', state.b.re], ['bi', state.b.im]]) {
        $(id).value = String(Math.round(value*1e6)/1e6);
      }
      $('angle').value = String(Math.round(state.phi*180/PI));
      $('angle-value').textContent = `${Math.round(state.phi*180/PI)}°`;
    }
    function setPoints(a, b) {
      if (!finite(a) || !finite(b)) { status('Enter a finite number in all four point fields.', true); return false; }
      if (abs(a) > .97 + 1e-12) { status('Choose a source with |a| ≤ 0.97 for the drawing controls.', true); return false; }
      if (Math.abs(b.re) > 3 || Math.abs(b.im) > .95) { status('Choose a target with |Re b| ≤ 3 and |Im b| ≤ 0.95 for the drawing controls.', true); return false; }
      state.a = a; state.b = b; syncInputs(); render();
      status('Points updated. The map still covers the whole infinite strip.'); return true;
    }
    function path(samples, parent, project, color, transform) {
      let d = '', previous = null;
      for (const sample of samples) {
        let value;
        try { value = transform ? transform(sample) : sample; } catch (_) { previous = null; continue; }
        const p = project(value);
        if (!p.every(Number.isFinite) || p.some(x => Math.abs(x) > 1e6)) { previous = null; continue; }
        const distance = previous ? Math.hypot(p[0] - previous[0], p[1] - previous[1]) : Infinity;
        d += `${distance < 150 ? 'L' : 'M'}${p[0].toFixed(2)},${p[1].toFixed(2)}`;
        previous = p;
      }
      element('path', { d, stroke: color, 'stroke-width': 1.1, 'vector-effect': 'non-scaling-stroke', opacity: .86 }, parent);
    }
    function drawGrid() {
      const disk = clear('disk-grid'), strip = clear('strip-grid');
      [.18, .36, .54, .72, .88, .97].forEach((radius, index) => {
        const samples = Array.from({ length: 721 }, (_, i) => polar(radius, 2*PI*i/720));
        path(samples, disk, diskXY, circleColors[index]);
        path(samples, strip, stripXY, circleColors[index], map.forward);
      });
      for (let index = 0; index < 12; index++) {
        const samples = Array.from({ length: 361 }, (_, i) => polar(.997*(1 - (1 - i/360)**2), PI*index/6));
        path(samples, disk, diskXY, rayColors[index % 6]);
        path(samples, strip, stripXY, rayColors[index % 6], map.forward);
      }
    }
    function drawMarker(id, value, project, label, probe = false) {
      const group = clear(id), [x, y] = project(value);
      if (!Number.isFinite(x) || !Number.isFinite(y)) return;
      element('circle', { cx: x, cy: y, r: probe ? 6.5 : 5, fill: probe ? 'none' : '#244e44', stroke: probe ? '#a76f27' : '#fff', 'stroke-width': probe ? 2 : 1.7 }, group);
      if (label) {
        const labelY = id === 'strip-marker' && value.im > .65 ? y + 20 : y - 9;
        element('text', { x: x + 9, y: labelY, class: 'marker-label' }, group, label);
      }
    }
    function drawEnds() {
      const group = clear('disk-ends');
      for (const [key, label] of [['negative', '−∞'], ['positive', '+∞']]) {
        const z = map.ends[key], [x, y] = diskXY(z);
        element('circle', { cx: x, cy: y, r: 3.5, fill: '#fcfdfb', stroke: '#536f66', 'stroke-width': 1.2 }, group);
        element('text', { x: 220 + 154*z.re, y: 172 - 154*z.im, 'text-anchor': z.re > .3 ? 'start' : z.re < -.3 ? 'end' : 'middle', class: 'end-label' }, group, label);
      }
    }
    function drawAxis() {
      const group = clear('strip-axis');
      element('path', { d: 'M24 168H416', stroke: '#d2dfd7', 'stroke-width': 1 }, group);
      const low = state.b.re - 4, high = state.b.re + 4;
      for (let tick = Math.ceil(low); tick <= high; tick++) {
        const x = 220 + 49*(tick - state.b.re);
        element('path', { d: `M${x} 214v6`, stroke: '#b5c5bc' }, group);
        element('text', { x, y: 253, 'text-anchor': 'middle' }, group, String(tick));
      }
      if (low <= 0 && high >= 0) element('path', { d: `M${220 - 49*state.b.re} 119v98`, stroke: '#d2dfd7', 'stroke-width': 1 }, group);
      $('viewport-label').textContent = `Re w from ${format(low)} to ${format(high)} · equal scale on both axes`;
    }
    function drawProbe() {
      const z = state.probe;
      try {
        const w = map.forward(z);
        drawMarker('disk-probe', z, diskXY, '', true);
        drawMarker('strip-probe', w, stripXY, '', true);
        const offscreen = Math.abs(w.re - state.b.re) > 4;
        $('probe-value').textContent = `${formatComplex(z)} ↦ ${formatComplex(w)}${offscreen ? ' (outside the strip window)' : ''}`;
      } catch (_) { clear('disk-probe'); clear('strip-probe'); $('probe-value').textContent = 'Move slightly farther inside the disk.'; }
    }
    function render() {
      map = createMap(state.a, state.b, state.phi);
      drawGrid(); drawAxis(); drawEnds();
      drawMarker('disk-marker', state.a, diskXY, 'a');
      drawMarker('strip-marker', state.b, stripXY, 'b');
      $('map-value').textContent = `F(${formatComplex(state.a)}) = ${formatComplex(state.b)}; F′(a) = ${formatComplex(map.derivativeAtSource())}`;
      drawProbe();
    }
    function pointerValue(event, svg, side) {
      const matrix = svg.getScreenCTM();
      if (!matrix) return null;
      const point = svg.createSVGPoint(); point.x = event.clientX; point.y = event.clientY;
      const local = point.matrixTransform(matrix.inverse());
      if (side === 'disk') return complex((local.x - 220)/137, (168 - local.y)/137);
      if (local.x < 24 || local.x > 416) return null;
      return complex(state.b.re + (local.x - 220)/49, (168 - local.y)/49);
    }
    for (const side of ['disk', 'strip']) {
      const svg = $(`${side}-svg`);
      function getProbe(event) {
        const value = pointerValue(event, svg, side);
        if (!value || (side === 'disk' ? abs(value) >= .999999 : Math.abs(value.im) >= .999999)) return null;
        try { return { value, z: side === 'disk' ? value : map.inverse(value) }; } catch (_) { return null; }
      }
      svg.addEventListener('pointermove', event => {
        const probe = getProbe(event); if (probe) { state.probe = probe.z; drawProbe(); }
      });
      svg.addEventListener('click', event => {
        const probe = getProbe(event);
        if (!probe) { status('Choose a point strictly inside the disk or between the strip boundaries.', true); return; }
        state.probe = probe.z;
        if ($('click-mode').value === 'probe') { drawProbe(); status('Probe moved; the prescribed points are unchanged.'); }
        else if (side === 'disk') setPoints(probe.value, state.b);
        else setPoints(state.a, probe.value);
      });
    }
    $('point-form').addEventListener('submit', event => {
      event.preventDefault();
      const number = id => $(id).value.trim() === '' ? NaN : Number($(id).value);
      setPoints(complex(number('ar'), number('ai')), complex(number('br'), number('bi')));
    });
    $('angle').addEventListener('input', () => {
      state.phi = Number($('angle').value)*PI/180;
      $('angle-value').textContent = `${$('angle').value}°`;
      if (!pending) { pending = true; requestAnimationFrame(() => { pending = false; render(); }); }
    });
    $('normalize').addEventListener('click', () => {
      state.phi = 0; syncInputs(); render(); status('F′(a) is now positive real; this normalization makes the map unique.');
    });
    function updateModeNotes() {
      const probing = $('click-mode').value === 'probe';
      $('disk-note').textContent = probing ? 'Click to place the probe. The prescribed source a stays fixed.' : 'Click inside to choose a. The dashed circle is excluded.';
      $('strip-note').textContent = probing ? 'Click to place the probe and follow its inverse image in the disk.' : 'Click between the dashed lines to choose b. The view follows Re b.';
    }
    $('reset').addEventListener('click', () => {
      state.a = complex(0); state.b = complex(0); state.phi = 0; state.probe = complex(.42, .28);
      $('click-mode').value = 'set'; updateModeNotes(); syncInputs(); render(); status('Reset to F₀(z) = (2/π) Log((1 + z)/(1 − z)).');
    });
    $('click-mode').addEventListener('change', updateModeNotes);
    syncInputs(); render();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
})(typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : null);

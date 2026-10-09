#!/usr/bin/env node
'use strict';

// These checks use the same pure helpers as the browser demos, without a DOM.
const assert = require('node:assert/strict');
const sphere = require('../../assets/interactive/spherical-foliation.js');
const strip = require('../../assets/interactive/disk-strip.js');

let seed = 0x5eeda11;
const random = () => {
  seed = (Math.imul(1664525, seed) + 1013904223) >>> 0;
  return seed / 0x100000000;
};
const uniform = (low, high) => low + (high - low) * random();
const c = (re, im = 0) => ({re, im});
const magnitude = z => Math.hypot(z.re, z.im);
const distance = (a, b) => Math.hypot(a.re - b.re, a.im - b.im);
const dot = (a, b) => a.reduce((sum, value, i) => sum + value * b[i], 0);
const cross = (a, b) => [a[1]*b[2] - a[2]*b[1], a[2]*b[0] - a[0]*b[2], a[0]*b[1] - a[1]*b[0]];
const diskPoint = radius => {
  const r = radius * Math.sqrt(random()), angle = uniform(-Math.PI, Math.PI);
  return c(r * Math.cos(angle), r * Math.sin(angle));
};

function close(actual, expected, tolerance, label) {
  assert(Number.isFinite(actual), `${label}: nonfinite result ${actual}`);
  assert(Math.abs(actual - expected) <= tolerance,
    `${label}: ${actual} differs from ${expected} by more than ${tolerance}`);
}

function complexClose(actual, expected, tolerance, label) {
  assert(Number.isFinite(actual.re) && Number.isFinite(actual.im), `${label}: nonfinite complex result`);
  assert(distance(actual, expected) <= tolerance,
    `${label}: error ${distance(actual, expected)} exceeds ${tolerance}`);
}

let groups = 0;
function check(name, body) {
  body();
  groups += 1;
  console.log(`PASS ${name}`);
}

check('spherical leaves: positive levels, the singular origin, and empty negative levels', () => {
  close(sphere.levelOf([3, 4, 0]), 12.5, 0, 'quadratic level');
  assert.equal(sphere.dimensionFromLevel(-1), null, 'negative levels have no leaf');
  assert.throws(() => sphere.radiusFromLevel(-1), RangeError);
  assert.equal(sphere.dimensionFromLevel(0), 0, 'the origin is a zero-dimensional leaf');
  close(sphere.radiusFromLevel(0), 0, 0, 'origin radius');
  for (const [level, radius] of [[0.125, 0.5], [0.5, 1], [2, 2], [4.5, 3]]) {
    assert.equal(sphere.dimensionFromLevel(level), 2);
    close(sphere.radiusFromLevel(level), radius, 1e-14, 'leaf radius');
    for (const cutaway of [false, true]) {
      const grid = sphere.sphereGrid(radius, cutaway, 8, 16);
      assert(grid.x.length > 2 && grid.x[0].length > 2, 'a surface grid is present');
      for (let i = 0; i < grid.x.length; i += 1) {
        for (let j = 0; j < grid.x[i].length; j += 1) {
          close(sphere.levelOf([grid.x[i][j], grid.y[i][j], grid.z[i][j]]),
            level, 2e-14, 'surface vertex stays on its level set');
        }
      }
    }
  }
});

check('rotation fields span each sphere tangent plane and vanish at the origin', () => {
  for (const field of sphere.rotationFields([0, 0, 0])) {
    close(Math.hypot(...field), 0, 0, 'origin tangent rank is zero');
  }
  const points = [[1, 0, 0], [0, -2, 0], [0, 0, 3], [1, 2, 3]];
  for (let i = 0; i < 100; i += 1) points.push([uniform(-2, 2), uniform(-2, 2), uniform(-2, 2)]);
  for (const point of points) {
    const fields = sphere.rotationFields(point), normSquared = dot(point, point);
    assert.equal(fields.length, 3);
    for (const field of fields) close(dot(point, field), 0, 1e-14, 'rotation is tangent to the level set');
    const largestArea = Math.max(...fields.flatMap((first, i) =>
      fields.slice(i + 1).map(second => Math.hypot(...cross(first, second)))));
    // Tangency gives rank <= 2; two independent fields give rank >= 2.
    assert(largestArea > 0.5 * normSquared, 'two rotation fields must be independent away from the origin');
  }
});

check('negative gradient trajectories cross leaves and solve x\u2032 = -x', () => {
  const point = [1.2, -0.7, 0.4], time = 0.8, h = 1e-5;
  const atTime = sphere.gradientTrajectory(point, time);
  const before = sphere.gradientTrajectory(point, time - h);
  const after = sphere.gradientTrajectory(point, time + h);
  assert(sphere.levelOf(atTime) < sphere.levelOf(point), 'positive time lowers the level');
  for (let axis = 0; axis < 3; axis += 1) {
    close((after[axis] - before[axis]) / (2*h), -atTime[axis], 2e-10, 'negative gradient ODE');
  }
  const energyDerivative = (sphere.levelOf(after) - sphere.levelOf(before)) / (2*h);
  close(energyDerivative, -dot(atTime, atTime), 3e-10, 'energy decreases by minus gradient norm squared');
  assert.deepEqual(sphere.gradientTrajectory([0, 0, 0], 4), [0, 0, 0]);
});

check('disk-to-strip scale agrees with elementary real and imaginary axis values', () => {
  const map = strip.createMap(c(0), c(0), 0);
  complexClose(map.forward(c(0.5)), c(2 * Math.log(3) / Math.PI), 2e-15, 'real axis value');
  complexClose(map.forward(c(0, 0.5)), c(0, 4 * Math.atan(0.5) / Math.PI), 2e-15, 'imaginary axis value');
  complexClose(map.inverse(c(0, 0.5)), c(0, Math.SQRT2 - 1), 2e-15, 'inverse imaginary axis value');
});

let maxAnchorError = 0, maxDiskRoundtrip = 0, maxStripRoundtrip = 0;
check('marked disk-to-strip maps preserve anchors, ranges, and both inverse identities', () => {
  for (let sample = 0; sample < 600; sample += 1) {
    const a = diskPoint(0.97), b = c(uniform(-3, 3), uniform(-0.95, 0.95));
    const phi = uniform(-Math.PI, Math.PI), map = strip.createMap(a, b, phi);
    const anchor = map.forward(a);
    maxAnchorError = Math.max(maxAnchorError, distance(anchor, b));
    complexClose(anchor, b, 5e-14, 'marked source maps to marked target');
    const z = diskPoint(0.997), w = map.forward(z);
    assert(Number.isFinite(w.re) && Math.abs(w.im) < 1, 'forward image lies in the open strip');
    const recovered = map.inverse(w);
    maxDiskRoundtrip = Math.max(maxDiskRoundtrip, distance(recovered, z));
    complexClose(recovered, z, 2e-10, 'inverse(forward(z))');
    const target = c(b.re + uniform(-3, 3), uniform(-0.95, 0.95));
    const source = map.inverse(target);
    assert(magnitude(source) < 1, 'inverse image lies in the open disk');
    const returned = map.forward(source);
    maxStripRoundtrip = Math.max(maxStripRoundtrip, distance(returned, target));
    complexClose(returned, target, 2e-8, 'forward(inverse(w))');
  }
});

let maxDerivativeRelativeError = 0;
check('the source derivative has the advertised phase, magnitude, and unique positive normalization', () => {
  const h = 1e-6;
  for (let sample = 0; sample < 180; sample += 1) {
    const a = diskPoint(0.9), b = c(uniform(-3, 3), uniform(-0.95, 0.95));
    const phi = uniform(-Math.PI, Math.PI), map = strip.createMap(a, b, phi);
    const expectedMagnitude = 4 * Math.cos(Math.PI*b.im/2) / (Math.PI * (1 - a.re*a.re - a.im*a.im));
    const expected = c(expectedMagnitude * Math.cos(phi), expectedMagnitude * Math.sin(phi));
    const reported = map.derivativeAtSource();
    complexClose(reported, expected, 2e-13 * expectedMagnitude, 'analytic source derivative');
    const left = map.forward(c(a.re - h, a.im)), right = map.forward(c(a.re + h, a.im));
    const below = map.forward(c(a.re, a.im - h)), above = map.forward(c(a.re, a.im + h));
    const dx = c((right.re - left.re)/(2*h), (right.im - left.im)/(2*h));
    // Dividing the vertical difference by 2ih checks the complex derivative independently.
    const dy = c((above.im - below.im)/(2*h), -(above.re - below.re)/(2*h));
    const relativeError = Math.max(distance(dx, expected), distance(dy, expected)) / expectedMagnitude;
    maxDerivativeRelativeError = Math.max(maxDerivativeRelativeError, relativeError);
    assert(relativeError < 2e-7, `complex derivative finite-difference error ${relativeError}`);
    const normalized = strip.createMap(a, b, 0).derivativeAtSource();
    assert(normalized.re > 0, 'the normalized derivative is positive');
    close(normalized.im, 0, 0, 'the normalized derivative is real');
    complexClose(normalized, strip.normalizedDerivative(a, b), 0, 'convenience normalization');
  }
});

check('horizontal target translations do not cause exponential overflow', () => {
  const a = c(0.3, -0.2), z = c(-0.4, 0.45), phi = 0.7;
  const base = strip.createMap(a, c(0, 0.6), phi);
  for (const translation of [-1000, 1000]) {
    const map = strip.createMap(a, c(translation, 0.6), phi), w = map.forward(z);
    const expected = base.forward(z);
    complexClose(w, c(expected.re + translation, expected.im), 2e-12, 'horizontal translation covariance');
    complexClose(map.inverse(w), z, 2e-10, 'translated inverse roundtrip');
    complexClose(map.derivativeAtSource(), base.derivativeAtSource(), 0, 'translation leaves derivative unchanged');
  }
});

check('open-domain checks reject boundary anchors and boundary evaluation points', () => {
  assert.throws(() => strip.createMap(c(1), c(0)), RangeError);
  assert.throws(() => strip.createMap(c(0), c(0, 1)), RangeError);
  assert.throws(() => strip.createMap(c(0), c(0, -1)), RangeError);
  const map = strip.createMap(c(0), c(0));
  assert.throws(() => map.forward(c(0, 1)), RangeError);
  assert.throws(() => map.inverse(c(0, 1)), RangeError);
});

console.log(`\n${groups} mathematical check groups passed (deterministic seed 0x5eeda11).`);
console.log('Maximum numerical errors:', {
  anchor: maxAnchorError,
  diskRoundtrip: maxDiskRoundtrip,
  stripRoundtrip: maxStripRoundtrip,
  derivativeRelative: maxDerivativeRelativeError
});

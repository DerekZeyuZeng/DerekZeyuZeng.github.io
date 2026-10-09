# Checks for the mathematical visualizations

Run from the repository root with Node.js:

```sh
node scripts/math_visualizations/verify.cjs
```

No packages, browser, Plotly, server, or network connection are needed. The
script imports the same pure mathematical helpers used by
`assets/interactive/spherical-foliation.js` and
`assets/interactive/disk-strip.js`. Random examples use the fixed seed
`0x5eeda11`, so a failure is reproducible.

## What is checked

- Spherical mesh vertices remain on their claimed level sets; positive levels
  have dimension two, the origin has dimension zero, and negative levels are
  empty.
- Rotation vector fields are tangent to the spheres, span a two-dimensional
  plane away from the origin, and vanish at the origin.
- Negative gradient trajectories satisfy the ODE and its energy-decrease
  identity. They cross leaves rather than describe the spherical leaves.
- The disk-to-strip map has the correct scale on the real and imaginary axes,
  takes its marked source to its marked target, stays in the correct domain,
  and satisfies both numerical inverse identities.
- Independent horizontal and vertical finite differences agree with the
  stated complex derivative. Zero phase gives a positive real derivative.
- Large horizontal target translations avoid exponential overflow, and
  boundary inputs are rejected instead of being treated as interior points.

The main random mapping checks use \(|a|\le0.97\), \(|z|\le0.997\), and
\(|\operatorname{Im}b|\le0.95\), matching the drawing's useful parameter range.
Finite differences use \(|a|\le0.9\) to keep a fixed differentiation step away
from the circle. The checks use explicit floating-point tolerances and report
the largest errors. They do not prove a global theorem, test rendering, or
guarantee accurate computations arbitrarily close to a boundary or at infinity.

## Mathematical conventions

The first model is \(f(x)=\tfrac12\lVert x\rVert^2\) on \(\mathbb R^3\).
For \(c>0\), its leaf is the sphere of radius \(\sqrt{2c}\); the zero leaf is
\(\{0\}\). The rotation fields \(x_i\partial_j-x_j\partial_i\) generate
the singular foliation. Their span is \(\ker df_x=x^\perp\) when \(x\ne0\)
and is zero at the origin. Although \(\ker df_0=\mathbb R^3\), that kernel
is not the tangent space to the zero-dimensional leaf. The regular spheres and
the origin are the orbits of the rotation group. See
[the Leiden foliation notes, §1.2.3, Example 1.13 and Definition 1.15](https://ncg-leiden.github.io/foliation2023/foliation_notes_narrow.pdf)
for the group-action and singular-foliation framework.

For the second model, \(a\in\mathbb D\), \(b\in S=\{w:|\operatorname{Im}w|<1\}\),
and the phase \(\phi\) is in radians. Set

\[
\eta=\frac{\pi\operatorname{Im}b}{2},\qquad
q=e^{i(\eta+\phi)}\frac{z-a}{1-\bar a z}.
\]

The implemented map is

\[
F(z)=\operatorname{Re}b+\frac2\pi\Log\left(
\cos\eta\frac{1+q}{1-q}+i\sin\eta\right).
\]

The logarithm is the principal branch on the right half-plane. Each factor
is biholomorphic, so this composition maps the entire disk onto the entire
strip. It satisfies

\[
F(a)=b,\qquad
F'(a)=\frac{4\cos\eta}{\pi(1-|a|^2)}e^{i\phi}.
\]

Specifying \(a\mapsto b\) leaves a phase freedom; \(\phi=0\) additionally
requires \(F'(a)>0\) and singles out one map. For the standard Riemann mapping
normalization, see
[McMullen's complex analysis notes, p. 6, item 40](https://people.math.harvard.edu/~ctm/home/text/class/berkeley/205/95/course/course.pdf).
The explicit strip formula and derivative above follow from direct coordinate
calculation; the numerical checks test their implementation.

# Morse and Morse–Smale height functions on a torus

This Python-generated, static Plotly illustration is embedded in the homepage's
Miscellaneous section. It compares the naive vertical height with a tilted
height, using the induced Euclidean metric in both cases. No Python server is
needed. Plotly.js 3.1.1 loads from Plotly's CDN when the iframe is opened; a
network connection and WebGL are needed.

The user-supplied `morse-smale-tilted-torus.html` is the visual reference for
the Morse–Smale view: the torus is tilted by \(26^\circ\), and an overview
distinguishes all four saddle manifolds using green, lime, magenta, and purple.
The mathematical definitions and coordinate check below document the model
used by the generated website illustration.

## Regenerate and check

From the repository root, with Python 3:

```sh
python -m pip install numpy plotly==6.3.1
python scripts/morse_torus/generate.py
python scripts/morse_torus/verify.py
```

Edit `template.html` for the controls and text. Edit `generate.py` for geometry.
Commit the generated HTML under `assets/interactive/` with the source edits.
The existing Jekyll build copies the generated HTML without running Python.

The verification script checks the critical points and their indices, the
negative-gradient formula and descent identity, and the numerically integrated
separatrices. These checks test the implementation; they are not formal
verification of the proof below. In particular, visually separated sampled
curves would not by themselves prove the Morse–Smale condition.

## Geometry and flow conventions

Coordinates are modulo \(2\pi\). The upright torus has its axis along the
\(y\)-axis:

\[
X(u,v)=((R+r\cos v)\cos u,\ r\sin v,\ (R+r\cos v)\sin u),
\qquad R=2,\quad r=0.68.
\]

Write \(A(v)=R+r\cos v\). The induced metric and the two height functions are

\[
g=A(v)^2du^2+r^2dv^2,\qquad
h_0=z,\qquad h_\varepsilon=z+\varepsilon y,
\qquad \varepsilon=\tan(26^\circ)\approx0.4877325886.
\]

All stable and unstable manifolds use the **negative** gradient flow, with
stable meaning convergence as \(t\to+\infty\):

\[
\dot u=-\frac{\cos u}{A(v)},\qquad
\dot v=\frac{\sin v\sin u-\varepsilon\cos v}{r}.
\]

The naive case is obtained by setting \(\varepsilon=0\). Along any solution,

\[
\frac{d}{dt}h_\varepsilon
=-\cos^2u-(\sin v\sin u-\varepsilon\cos v)^2
=-\|\operatorname{grad}_g h_\varepsilon\|_g^2.
\]

For the tilted display, set
\(\alpha=\arctan\varepsilon\) and \(S=\sqrt{1+\varepsilon^2}\). Apply the rigid
rotation about the \(x\)-axis

\[
R_x(\alpha)(x,y,z)
=\left(x,\frac{y-\varepsilon z}{S},\frac{z+\varepsilon y}{S}\right).
\]

The displayed vertical height is then \(h_\varepsilon/S\). The rotation
preserves the metric, and dividing the height by the positive constant \(S\)
only rescales time. Thus the displayed curves really are vertical descent
trajectories on the rotated torus. The displayed tilt is \(26^\circ\).

## Critical points

The critical equations are \(\cos u=0\) and
\(\sin v\sin u=\varepsilon\cos v\). Their four solutions are:

| Point | Coordinates for \(h_\varepsilon\) | Height \(h_\varepsilon\) | Morse index |
|---|---|---|---:|
| \(p_1\), minimum | \((3\pi/2,2\pi-\alpha)\) | \(-R-rS\) | 0 |
| \(p_2\), lower saddle | \((3\pi/2,\pi-\alpha)\) | \(-R+rS\) | 1 |
| \(p_3\), upper saddle | \((\pi/2,\pi+\alpha)\) | \(R-rS\) | 1 |
| \(p_4\), maximum | \((\pi/2,\alpha)\) | \(R+rS\) | 2 |

Here “lower” and “upper” refer to the stated parameters, for which \(R>rS\).
Setting \(\alpha=0\) gives the naive critical points. At every critical point,
the mixed second derivative vanishes and the Hessian's diagonal entries are

\[
\partial_{uu}h_\varepsilon=-A(v)\sin u,\qquad
\partial_{vv}h_\varepsilon=-r(\cos v\sin u+\varepsilon\sin v).
\]

Their signs give the indices in the table. All four critical points are
nondegenerate in both models, so both functions are Morse.

Every trajectory has a single critical point as each of its forward and
backward limits. Indeed, compactness gives nonempty limit sets. Repeated visits
near a noncritical point would force repeated height drops of a fixed positive
size, contradicting convergence of the bounded monotone height. Thus limit
sets contain only critical points, and a connected limit set contained in this
finite critical set consists of one point. Consequently,
the stable manifolds partition the torus, as do the unstable manifolds.

## Why the naive height is not Morse–Smale

The Morse–Smale condition concerns the **function and metric together**: every
\(W^u(p)\) must meet every \(W^s(q)\) transversely. For the naive height
\(h_0=z\), put

\[
C=\{v=\pi\},\qquad U=\{u=\pi/2\},\qquad L=\{u=3\pi/2\}.
\]

All three circles are invariant. The flow restricted to them, together with
the stable manifold theorem, gives the following exact manifolds:

| Point | Stable manifold | Unstable manifold |
|---|---|---|
| \(p_1\) | \(T^2\setminus(C\cup U)\) | \(\{p_1\}\) |
| \(p_2\) | \(C\setminus\{p_3\}\) | \(L\setminus\{p_1\}\) |
| \(p_3\) | \(U\setminus\{p_4\}\) | \(C\setminus\{p_2\}\) |
| \(p_4\) | \(\{p_4\}\) | \(T^2\setminus(C\cup L)\) |

In particular,

\[
W^u(p_3)\cap W^s(p_2)=C\setminus\{p_2,p_3\}.
\]

Its two components are saddle-to-saddle trajectories from \(p_3\) to
\(p_2\). At each point of either trajectory, both tangent lines equal
\(\operatorname{span}(\partial_u)\). Their sum has dimension one rather
than two, so the intersection is not transverse. Thus this naive height is
Morse, but \((h_0,g)\) is **not Morse–Smale**.

## Why the tilted height is Morse–Smale

The following coordinate argument works for every \(\varepsilon>0\),
including the displayed \(\varepsilon=\tan(26^\circ)\).

The meridians \(U\) and \(L\) remain invariant. On \(U\), the equation for
\(v\) is \(\dot v=S\sin(v-\alpha)/r\); on \(L\), it is
\(\dot v=-S\sin(v+\alpha)/r\). Therefore,

\[
W^s(p_3)=U\setminus\{p_4\},\qquad
W^u(p_2)=L\setminus\{p_1\}.
\]

For the two other saddle separatrices, consider the open bands

\[
B_- = \{\pi<v<2\pi\},\qquad B_+ = \{0<v<\pi\}.
\]

At \(v=\pi\), the vector field has \(\dot v=\varepsilon/r>0\); at
\(v=0\) or \(2\pi\), it has \(\dot v=-\varepsilon/r<0\). Hence \(B_-\)
is forward invariant and \(B_+\) is backward invariant.

Because \(p_3\in B_-\), both branches of \(W^u(p_3)\) stay in \(B_-\).
The only critical points in its closure are \(p_3\) and \(p_1\). Strict
descent excludes a return to \(p_3\), so both branches converge to \(p_1\).
Similarly, \(W^s(p_2)\subset B_+\), and both of its branches converge to
\(p_4\) in backward time. In particular,

\[
W^u(p_3)\cap W^s(p_2)=\varnothing.
\]

The opposite saddle pairing also has empty intersection because
\(W^u(p_2)\subset L\) and \(W^s(p_3)\subset U\), and \(L\cap U=\varnothing\).
There are therefore no trajectories connecting the distinct saddles.

This checks all potentially problematic intersections on a surface. At the
same critical point, the stable and unstable tangent spaces are complementary
eigenspaces of the linearized gradient field, and strict descent excludes
any other intersection. A two-dimensional stable or unstable manifold is
open, so its intersections are automatically transverse. Any remaining pairing
involving a zero-dimensional manifold is empty unless it is a same-critical-point
case already checked. Thus
\((h_\varepsilon,g)\) is **Morse–Smale**.

For clarity, the exact definitions of the two-dimensional open cells are

\[
W^s(p_1)=T^2\setminus
\bigl(W^s(p_2)\cup W^s(p_3)\cup\{p_4\}\bigr),
\]

\[
W^u(p_4)=T^2\setminus
\bigl(W^u(p_2)\cup W^u(p_3)\cup\{p_1\}\bigr).
\]

These formulas include the relevant extremum and exclude the entire indicated
separatrix graph; a limiting point of a saddle manifold is not part of that
saddle manifold.

For rendering, write the curved unstable separatrix as \(v=b_u(u)\) on
\(-\pi/2<u<3\pi/2\), and the curved stable separatrix as \(v=b_s(u)\) on
\(\pi/2<u<5\pi/2\). These are graphs because \(u\) is strictly monotone
on each branch away from its limiting meridians and its saddle. With the exact
graphs, the open cells can be parametrized by

\[
W^u(p_4):\quad -\pi/2<u<3\pi/2,\qquad
b_u(u)<v<b_u(u)+2\pi,
\]

\[
W^s(p_1):\quad \pi/2<u<5\pi/2,\qquad
b_s(u)<v<b_s(u)+2\pi.
\]

The omitted \(u\)-meridian in each case is the other excluded saddle manifold
together with its limiting extremum. The renderer substitutes numerical
interpolants for \(b_u\) and \(b_s\), and widens the gaps along the edges for
visibility. These sampled surfaces approximate the exact open cells above.

For the general definition and the upright-torus exercise, see
[Umut Varolgunes's Morse theory notes, p. 41, Definition 33 and Question 85](https://umutvg.github.io/lecture-notes-W21.pdf).
The explicit tilted function and the coordinate proof above are checked here;
they are not being attributed to that reference.

## Numerical and display conventions

- In the selected-manifold view and the focused two-curve comparison, red is
  unstable and blue is stable. The four-manifold overview instead follows the
  supplied reference's green, lime, magenta, and purple palette so that each
  saddle manifold can be distinguished. Every manifold includes its own
  critical point.
- The naive one-dimensional manifolds and the tilted invariant meridians use
  their exact coordinate formulas. The tilted \(W^u(p_3)\) and \(W^s(p_2)\)
  are drawn by RK4 integration from points near the corresponding saddle along
  its unstable or stable eigendirection. Their endpoints are limits of the
  mathematical curves, not extra points of the saddle manifold.
- The tilted two-dimensional cells are displayed using the numerically sampled
  separatrix graph as their boundary. Dark curves mark the excluded sets.
  Gaps around them are widened for visibility; the mathematical definition
  removes curves and points, not strips of positive width. The naive cells use
  the exact excluded circles above with the same display convention.
- One-dimensional drawings also stop slightly short of excluded limiting points.
- Additional sampled trajectories use forward and backward RK4 integration.
  Their individual colors distinguish curves and have **no basin meaning**.
  Arrows on the one-dimensional manifolds point in forward time.
- Unselected critical points are hollow. Their presence is contextual, not an
  assertion that they belong to the selected manifold.
- The grey torus is a reference surface in the 0D and 1D views. The optional
  see-through control reveals hidden curves, with possible transparency artifacts.
- Lines are lifted by a small normal offset for visibility; their mathematical
  coordinates remain those of the torus. Surface shading uses analytic normals,
  rotated together with the torus in the tilted view.
- Rotate the figure to inspect the curves: a projection can place distinct
  curves on top of one another, and the apparent edge of the hole is not
  generally the naive inner equator \(C\).

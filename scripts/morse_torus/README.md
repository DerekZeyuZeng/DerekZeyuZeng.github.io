# Morse theory on an upright torus

This Python-generated, static Plotly illustration is embedded in the homepage's
Miscellaneous section. No Python server is needed. Plotly.js 3.1.1 loads from
Plotly's CDN when the iframe is opened; a network connection and WebGL are needed.

## Regenerate

From the repository root, with Python 3:

```sh
python -m pip install numpy plotly==6.3.1
python scripts/morse_torus/generate.py
```

Edit `template.html` for the controls and text. Edit `generate.py` for geometry.
Commit the resulting `assets/interactive/morse-torus.html` with the source edits.
The existing Jekyll build copies the generated HTML without running Python.

## Model

Write

\[
X(u,v)=((R+r\cos v)\cos u,\ r\sin v,\ (R+r\cos v)\sin u),
\qquad R=2,\ r=0.68.
\]

For the height function \(f=z\) and the induced Euclidean metric,

\[
g=(R+r\cos v)^2du^2+r^2dv^2,\qquad
\dot u=-\frac{\cos u}{R+r\cos v},\quad
\dot v=\frac{\sin v\sin u}{r}.
\]

All manifolds use this **negative** gradient flow. They are analytic subsets
given in the table below, not regions inferred from the sampled trajectories.
Coordinates are modulo \(2\pi\).

Let \(C=\{v=\pi\}\), \(U=\{u=\pi/2\}\), and \(L=\{u=3\pi/2\}\).

| Point | Coordinates | Index | Stable manifold | Unstable manifold |
|---|---|---:|---|---|
| \(p_1\) | \((3\pi/2,0)\) | 0 | \(T^2\setminus(C\cup U)\) | \(\{p_1\}\) |
| \(p_2\) | \((3\pi/2,\pi)\) | 1 | \(C\setminus\{p_3\}\) | \(L\setminus\{p_1\}\) |
| \(p_3\) | \((\pi/2,\pi)\) | 1 | \(U\setminus\{p_4\}\) | \(C\setminus\{p_2\}\) |
| \(p_4\) | \((\pi/2,0)\) | 2 | \(\{p_4\}\) | \(T^2\setminus(C\cup L)\) |

At a critical point the mixed second derivative of \(f\) vanishes;
the diagonal terms are \(-(R+r\cos v)\sin u\) and \(-r\cos v\sin u\).
These give the indicated indices. The circles \(C,U,L\) are flow invariant.
The stable manifold theorem, together with the flow direction on these circles,
gives the one-dimensional manifolds. Every forward/backward limit is critical:
strict decrease of the height excludes nonconstant recurrence, and the finite
critical set forces each connected limit set to be a single point. Taking
complements of the lower-dimensional manifolds gives the two open cells.

This function is Morse, but the pair is **not Morse–Smale**: the two trajectories
in \(C\setminus\{p_2,p_3\}\) connect critical points of the same index.
The corresponding stable and unstable tangent lines coincide along them.

## Display conventions

- Red is unstable; blue is stable. Every manifold includes its own critical point.
- Unselected critical points are hollow. Their presence is contextual, not an
  assertion that they belong to the selected manifold.
- The grey torus is a reference surface in the 0D and 1D views. The optional
  see-through control reveals hidden curves, with possible transparency artifacts.
- For 2D manifolds, dark curves mark the excluded sets. Gaps are widened for
  visibility; they do not represent positive-width deletions in the definition.
- Likewise, the 1D drawings stop slightly short of excluded limiting points.
- Thin grey curves are RK4 samples of individual trajectories, with both forward
  and backward integration. Arrows on the 1D manifolds point in forward time.
- Lines are lifted by a small normal offset for visibility; their mathematical
  coordinates remain those of the torus. Surface shading uses its analytic normals.
- Rotating the figure is essential: a projection can place distinct curves on
  top of one another, and the apparent edge of the hole is not generally \(C\).

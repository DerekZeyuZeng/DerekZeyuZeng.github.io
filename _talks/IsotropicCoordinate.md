---
title: "Derivation of Conformally Flat Metric for Generalized
Schwarzschild-like Solutions"
collection: talks
type: "Poster Presentation"
permalink: /talks/IsotropicCoordinate
venue: "UIUC Undergraduate Research Symposium, Poster Session"
date: 2025-04-24
location: "Urbana, IL, USA"
---
We present a unified coordinate transformation that renders a wide class of static, spherically symmetric spacetimes conformally flat. This framework recovers explicit isotropic-coordinate forms for the Schwarzschild and Reissner–Nordström metrics, derives elliptic-integral solutions for Kottler spacetimes, and outlines extensions to Kiselev-type fluids. The closed-form expressions streamline the generation of clean initial data and simplify boundary and matching conditions in 3 + 1 numerical relativity, bridging near-horizon to cosmological scales.

<p><a href="{{ 'files/Isotropic_Coordinate_Poster.pdf' | relative_url }}" download>Download PDF</a></p>

Starting from the general form of a spherical symmetric (Schwarzschild-like) metric:

$$
\mathrm{d}s^{2}= -f(r)\mathrm{d}t^{2}+f(r)^{-1}\mathrm{d}r^{2}+r^{2}\mathrm{d}\Omega^{2}
$$

we obtain the conformally flat spatial form

$$
\mathrm{d}s^{2}= -F(\rho)\mathrm{d}t^{2}+G(\rho)(\mathrm{d}x^{2}+\mathrm{d}y^{2}+\mathrm{d}z^{2})
$$

The key step is the general transformation

$$
\rho=\rho_{0}\exp \int \frac{\mathrm{d}r}{r\sqrt{f(r)}}
$$

from which we obtain closed forms for Schwarzschild and Reissner–Nordström and elliptic-integral expressions for Kottler \\(\Lambda \neq 0\\); extensions to Kiselev-type fluids are outlined.
These explicit formulas enable clean, conformally flat initial data across near-horizon to cosmological scales and streamline boundary and matching conditions in \\(3{+}1\\) numerical relativity.

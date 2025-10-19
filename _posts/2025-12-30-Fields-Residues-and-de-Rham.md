---
title: 'Fields, Residues, and de Rham Cohomology'
date: 2025-12-30
permalink: /posts/2025/12/Fields-Residues-and-de-Rham/
tags:
  - Mathematics
  - Geometry and Topology
  - Physics
  - Field Theory
published: Yes
---
**Goal**. Starting from the most basic electrodynamics and Maxwell's equations, differential forms and Hodge stars are introduced using actual physical quantities, thus naturally leading to de Rham theory; then, considering the 2-dimensional electrodynamics, angular functions and logarithmic potentials are explained using cohomological/distributed differential forms, and cohomological proofs and explicit calculations of conclusions such as the residue theorem and the principle of discriminability are given.

**Prerequisite**. Basice Riemannian geometry, there is an review of basic geometry on Riemannian manifold, but the definition of manifolds, Riemannian metric, and Levi-Civita connection.

Notation and Conventions, Preliminaries
---

- Without any further reminder, $M$ is a $n$-dimensional manifold. In four dimensions, we often consider $M$ to be locally $\R^{1 + 3}$, in two dimensions, take $M$ locally $\R^2 \cong \mathbb{C}$.
- $\Omega^k(M)$ is the space of $k$-forms; the exterior direvative is denoted by $\mathrm d$, and the exterior product is $\wedge$.
- The orientation and metric $(g)$ give the Hodge star $*:\Omega^k\to\Omega^{n-k}$, with the volume form denoted by $\mathrm{vol}$. The convention is $\alpha\wedge*\beta=\langle\alpha,\beta\rangle \mathrm{vol}$.
- The codirevative $\delta:=(-1)^{n(k+1)+1}*\mathrm d*$ acts on the $k$-forms. In the two-dimensional Euclidean case, for the 1-form $\alpha$, $\delta\alpha=-*\mathrm d*\alpha$.
- The Laplace–Beltrami operator in general is given by $\Delta:=\mathrm d\delta+\delta\mathrm d$. In the 0-form (function), the two-dimensional Euclidean case has $\Delta f=\partial_x^2f+\partial_y^2f$ (positive sign convention).
- Unit Convention: For simplicity, the absorption constant $\varepsilon_0=\mu_0=1$. Changing the units simply adds a constant factor to the right side of the equation and does not affect the geometry.

Tangent Bundle and Differential Forms on Manifolds
---

**Def** (Tangent Bundle).

**Def** (Cotangent Bundle and Differential Forms).

**Def** (Hodge Star).

**Def** (Gradient).

**Def** (Divergent).

**Def** (Laplace–Beltrami Operator). The Laplace–Beltrami operator is the generalization of the Laplacian on $\R$.

**Theorem** (Laplace–Beltrami Operator in Local Coordinate).

**Def** (Hodge Star Operator).

**Theorem** (Laplace–Beltrami Operator in Exterior Direvative and Coderivative).

The Maxwell's Equations
---

From “Conservation Laws = Closedness” to “Flux = Homological Invariance”
---

Cohomology of Conservation Laws and Electric Charge
---

Down to 2D: Electrostatics, Angular Functions, and Hodge Stars
---

From 2D Electrodynamics to Complex Analysis
---

References
---

1. F. W. Hehl & Y. Obukhov, Foundations of Classical Electrodynamics, Birkhäuser.
2. T. Frankel, The Geometry of Physics, Chs. 2–4 (Differential forms and physics).
3. M. Spivak, Calculus on Manifolds (Stokes' theorem and de Rham's theory).
4. L. Hörmander, The Analysis of Linear Partial Differential Operators I (Distribution and fundamental solutions).
5. H. Cartan, Differential Forms (Classic and short formalism).

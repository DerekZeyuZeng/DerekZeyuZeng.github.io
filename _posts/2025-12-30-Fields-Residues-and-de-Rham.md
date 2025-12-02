---
title: 'Fields, Residues, and de Rham Cohomology'
date: 2025-12-30
permalink: /posts/2025/12/Fields-Residues-and-de-Rham/
tags:
  - Mathematics
  - Geometry and Topology
  - Physics
  - Field Theory
published: No
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

A Breif Reivew of Differential Geometry
---

In this section we simply list several definitions and key concepts in differential geometry as a brief review. We begin with the definition of a topological manifold.

A (topological) $n$-**manifold** is a Hausdorff, second‑countable topological space $(M,\mathcal{O}_M)$ such that there exists an open cover $\{U_\alpha\}_{\alpha\in A}$ of $M$ and homeomorphisms $\varphi_\alpha: U_\alpha \to V_\alpha \subseteq \mathbb{R}^n$. A pair $(U_\alpha,\varphi_\alpha)$ is called a **chart**, and a collection of charts whose domains cover $M$ is an **atlas**. The integer $n$ is the dimension of $M$.

In this article, we claim that there is a smooth structure, i.e., there is a maximum (does not contained in any other atlas) atlas $\mathcal A = \{(U_\alpha, \varphi_\alpha)\}$ such that $\forall (U_\alpha, \varphi_\alpha), (U_\beta, \varphi_\beta) \in \mathcal A$, either $U_\alpha \cap U_\beta = \emptyset$ or $\varphi_\alpha \circ \varphi_\beta^{-1}$ is a diffeomorphism.

The calculus on manifolds is highly rely on the tangent space to understand the tangent space, one can illustrate the tangent space in two equivalence ways: In the following definition, without other explaination, we take $I_\epsilon = (- \epsilon, \epsilon)$ for some $\epsilon \in [0, +\infty)$

1. The equivlance class of curves: Let $\Gamma_p := \{\gamma \in C^\infty(I_\epsilon, M) \mid \gamma(0) = p \in M\}$ be the space of curves that
2. The derivation on smooth functions (or function germs):

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

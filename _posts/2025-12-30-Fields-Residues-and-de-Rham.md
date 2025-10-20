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

Review: Tangent Bundle and Differential Forms on Manifolds
---

**Def** (Tangent Bundle). The tangent bundle on the smooth manifold $M$ is simplly a vector bundle $(TM, M, \pi)$ with total space
$$
TM = \coprod_{p \in M} T_pM := \big\{ v_p \mid \forall p \in M: v_p \in T_pM \big\}
$$
With the base space $M$ and projection $\pi: TM \to M$ such that $\forall v_p \in TM: \pi(v_p) = p \in M$.

**Def** (Cotangent Bundle and Differential Forms). The cotangent bundle on the smooth manifold $M$ is the dual vector bundle $(T^*M, M, \pi)$ with total space
$$
T^*M = \coprod_{p \in M} T_p^*M := \big\{ \omega_p \mid \forall p \in M: v_p \in T_p^*M \big\}
$$
With the base space $M$ and projection $\pi: TM \to M$ such that $\forall \omega_p \in T^*M: \pi(\omega_p) = p \in M$. A differential 1-form on $M$ is given by 
$$
\Omega^1(M) := \Gamma(T^*M), \quad \forall \omega \in \Omega^1(M): \omega = \sum_{i = 1}^n \omega_i \diff x^i
$$
Where $\{\diff x^i\}_{i = 1}^n$ is given to be the bases of cotangent space on each point. The differential $k$-forms is given by 
$$
\Omega^k(M) = \Gamma(\Lambda^k T^*M) = \mathrm{Span}\Big\{\bigwedge_{i = 1}^k\mathrm{d} x^{\sigma(i)} \mid \sigma \in S_k\Big\}
$$

**Def** (Exterier Derivatives).

**Def** (Hodge Star). The Hodge star operator on the $n$ dimensional smooth manifold defineds the isomorphism $*: \Omega^{k}(M) \to \Omega^{m - k}(M)$.

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

---
title: 'Differential Geometry by Need'
date: 2025-12-30
permalink: /posts/2025/11/Differential-Geometry-by-Need/
tags:
  - Mathematics
  - Geometry and Topology
published: No
---

Tangent Bundle and Differential Forms on Manifolds
---

**Def** (Tangent Bundle). The tangent bundle on the smooth manifold $M$ is simplly a vector bundle $(TM, M, \pi)$ with total space
$$
TM = \coprod_{p \in M} T_pM := \big\{ v_p \mid \forall p \in M: v_p \in T_pM \big\}
$$
With the base manifold $M$ and projection $\pi: TM \to M$ such that $\forall v_p \in TM: \pi(v_p) = p \in M$.

**Def** (Cotangent Bundle and Differential Forms). The cotangent bundle on the smooth manifold $M$ is the dual vector bundle $(T^*M, M, \pi)$ with total space
$$
T^*M = \coprod_{p \in M} T_p^*M := \big\{ \omega_p \mid \forall p \in M: v_p \in T_p^*M \big\}
$$
With the base space $M$ and projection $\pi: TM \to M$ such that $\forall \omega_p \in T^*M: \pi(\omega_p) = p \in M$. A differential 1-form on $M$ is given by 
$$
\Omega^1(M) := \Gamma(T^*M), \quad \forall \omega \in \Omega^1(M): \omega = \sum_{i = 1}^n \omega_i \mathrm d x^i
$$
Where $\{\mathrm d x^i\}_{i = 1}^n$ is given to be the bases of cotangent space on each point. The differential $k$-forms is given by 
$$
\Omega^k(M) = \Gamma(\Lambda^k T^*M) = \mathrm{Span}\Big\{\bigwedge_{i = 1}^k\mathrm{d} x^{\sigma(i)} \mid \sigma \in S_k\Big\}
$$

**Def** (Exterier Derivatives). The exterier derivative is a $\R$-linear map $\mathrm d: \Omega^k(M) \to \Omega^{k + 1}(M)$

**Def** (Hodge Star). The Hodge star operator on the $n$ dimensional smooth manifold defineds the isomorphism $*: \Omega^{k}(M) \to \Omega^{m - k}(M)$.

**Def** (Gradient).

**Def** (Divergent).

**Def** (Laplace–Beltrami Operator). The Laplace–Beltrami operator is the generalization of the Laplacian on $\R$.

**Theorem** (Laplace–Beltrami Operator in Local Coordinate).

**Def** (Hodge Star Operator).

**Theorem** (Laplace–Beltrami Operator in Exterior Direvative and Coderivative).
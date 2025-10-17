---
title: 'Tensor Product, Dual Space, and Abstruct Linear Algebra'
date: 2025-10-18
permalink: /posts/2025/10/Tensor-Product-Dual-Space-and-Abstruct-Linear-Algebra/
tags:
  - Mathematics
  - Algebra
  - Linear Algebra
  - Tensor Analysis
---
**Introduction**. We recast familiar linear algebra in a map-centric language. Objects are determined by the morphisms they admit; duals arise from the functor $\mathrm{Hom}_k(-, k)$; tensor products are specified by a universal property rather than coordinates. Passing from fields to rings widens linearity to modules, and monoidal (closed) categories abstract the algebra of $\otimes$ and the unit—best seen via string diagrams.\
The throughline is operational: powerful constructions are those characterized by how maps into or out of them behave. Each section starts from a concrete tension—duals in infinite dimension, “bilinear vs linear,” and change of scalars—and resolves it with a clean abstraction—universal properties, adjunctions, and internal Homs. By the end you will comfortably trade bilinear data for linear data $\mathrm{Hom}(U \otimes V, W) \cong \mathrm{Bil}(U \times V, W)$, recognize $\mathbf{Vect}_k$ as a symmetric closed monoidal category, and use adjunctions to explain why extension of scalars $S \otimes_R -$ behaves exactly the way your linear intuition expects.

The content about category theory is mainly based on the *Introduction to Algebra* by Prof. Wen-Wei Li in PKU.

Preliminaries: Categories by Need, not Creed
---

Mathematicians developed the category theory mainly to discribe the widly existed binary relationsip in mathematics, and use "functor" to connect different sructures to generate duality between field. It is originally discovered to formalize the algebraic topology. The widly use concept of "natural", "canonical" can also be properly explained in the language of category.

**Def**. A category $\mathcal{C}$ consists the following data:

1. The objext in the category, $\mathrm{Obj}(\mathcal{C})$.
2. The morphism in the category, $\mathrm{Mor}(\mathcal{C})$, with a pair of map $s, t: \mathrm{Mor}(\mathcal{C}) \to \mathcal{C}$ wich specify the source and target of the morphism, which $\forall X, Y \in \mathrm{Obj}(\mathcal{C})$, we denote $\mathrm{Hom}_\mathcal{C}(X, Y) := s^{-1}(X) \cap t^{-1}(Y)$ which represents all morphism from $X$ to $Y$, $\forall f \in \mathrm{Hom}_{\mathcal{C}}(X, Y)$ we write $X \xrightarrow{f}Y$.
3. $\forall X \in \mathrel{Obj}(\mathcal{C}): \exists \mathrm{id}_X \in \mathrm{Hom}_\mathcal{C}(X,X)$ known as the identity morphism on $X$.
4. $\forall X, Y, Z \in \mathrm{Obj}(\mathcal{C})$, the composite map of morphisms is given by $\circ: \mathrm{Hom}_\mathcal{C}(X, Y) \times \mathrm{Hom}_\mathcal{C}(Y, Z) \to \mathrm{Hom}_\mathcal{C}(Y, Z)$

**Remark**. We often use commutative diagrams to represent the composition of morphisms, since $\forall f \in \mathrm{Hom}_\mathcal{C}(X, Y)$, it can be also denote as $f: X \to Y$ or $X \xrightarrow{f} Y$, we can also represent the morphism in "arrows". The following diagram is just $g \circ f = h$:
$$
<script type="text/tikz">
  \begin{tikzcd}
    X \arrow[r, "f"] \arrow[rd, "h"] & Y \arrow[d, "g"] \\
    & Z
  \end{tikzcd}
</script>
$$



Vector Space and their Dual Spaces
---

Ring and Module
---

Tensor Product
---

Closed Monoidal Category
---

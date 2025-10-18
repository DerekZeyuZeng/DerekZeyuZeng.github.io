---
title: 'Tensor Product, Dual Space, and Abstruct Linear Algebra'
date: 2025-11-18
permalink: /posts/2025/11/Tensor-Product-Dual-Space-and-Abstruct-Linear-Algebra/
tags:
  - Mathematics
  - Algebra
  - Linear Algebra
  - Tensor Analysis
published: No
---
**Introduction**. We recast familiar linear algebra in a map-centric language. Objects are determined by the morphisms they admit; duals arise from the functor $\Hom_k(-, k)$; tensor products are specified by a universal property rather than coordinates. Passing from fields to rings widens linearity to modules, and monoidal (closed) categories abstract the algebra of $\otimes$ and the unit—best seen via string diagrams.\
The throughline is operational: powerful constructions are those characterized by how maps into or out of them behave. Each section starts from a concrete tension—duals in infinite dimension, “bilinear vs linear,” and change of scalars—and resolves it with a clean abstraction—universal properties, adjunctions, and internal Homs. By the end you will comfortably trade bilinear data for linear data $\Hom(U \otimes V, W) \cong \mathrm{Bil}(U \times V, W)$, recognize $\Vect_k$ as a symmetric closed monoidal category, and use adjunctions to explain why extension of scalars $S \otimes_R -$ behaves exactly the way your linear intuition expects.

The content about category theory is mainly follows on the *Methods of algebra, Vol. 1* (In Chinese, 代数学方法 卷1) by Prof. Wen-Wei Li (李文威) in PKU. The tikz-cd commutative diagrams are not compiled with colors suitable for dark themes; for best readability, please view this paper in light mode.

Preliminaries: Categories by Need, not Creed
---

Mathematicians developed the category theory mainly to discribe the widly existed binary relationsip in mathematics, and use "functor" to connect different sructures to generate duality between field. It is originally discovered to formalize the algebraic topology. The widly use concept of "natural", "canonical" can also be properly explained in the language of category.

**Def**. A category $\mathcal{C}$ consists the following data:

1. The objext in the category, $\Obj(\mathcal{C})$.
2. The morphism in the category, $\Mor(\mathcal{C})$, with a pair of map $s, t: \Mor(\mathcal{C}) \to \mathcal{C}$ wich specify the source and target of the morphism, which $\forall X, Y \in \Obj(\mathcal{C})$, we denote $\Hom_{\mathcal{C}}(X, Y) := s^{-1}(X) \cap t^{-1}(Y)$ which represents all morphism from $X$ to $Y$, $\forall f \in \Hom_{\mathcal{C}}(X, Y)$ we write $X \xrightarrow{f}Y$. All morphism from $X$ to itself is named to be endomorphisms, denotes as $\End_\mathcal{C}(X) := \Hom_\mathcal{C}(X, X)$
3. $\forall X, Y, Z \in \Obj(\mathcal{C})$, the composite map of morphisms is given by $\circ: \Hom_{\mathcal{C}}(X, Y) \times \Hom_{\mathcal{C}}(Y, Z) \to \Hom_{\mathcal{C}}(Y, Z)$ which follows that
   - Associtivity: $\forall f, g, h \in \Mor(\mathcal{C})$, $(f \circ g) \circ h = f \circ (g \circ h)$ if they both well-defined.
   - Identity: $\forall X, Y \in \Obj(\mathcal{C}): \forall f \in \Hom_\mathcal{C}(X, Y): \exists \id_X, \id_Y \in \Hom_\mathcal{C}(X,X), \Hom_\mathcal{C}(Y,Y)$ named identity morphism on $X$ and $Y$ such that $\id_Y \circ f = f \circ \id_Y$.

**Remark**.
- We often use commutative diagrams to represent the composition of morphisms, since $\forall f \in \Hom_{\mathcal{C}}(X, Y)$, it can be also denote as $f: X \to Y$ or $X \xrightarrow{f} Y$, we can also represent the morphism in "arrows". The diagram

  <div style="display:flex; justify-content:center; margin:1.5em 0;">
    <script type="text/tikz">
      \Large
      \begin{tikzcd}[row sep=3em, column sep=4em]
        X \arrow[r, "f"] \arrow[rd, "h"] & Y \arrow[d, "g"] \\
        & Z
      \end{tikzcd}
    </script>
  </div>

  refers to the fact that $h = g \circ f: X \to Z$.
- $\forall f \in \Hom_\mathcal{C}(X,Y)$, if $\exists g \in \Hom_\mathcal{C}(Y,X): g \circ f = \id_X, \ f \circ g = \id_Y$, we say that $f$ is an isomorphism between $X$ and $Y$. Then set of all isomorphism between $X$ and $Y$ is $\mathrm{Isom}_\mathcal{C}(X, Y)$. In particular, the automorphism is defined to be $\Aut_\mathcal{C}(X) := \mathrm{Isom}_\mathcal{C}(X,X)$.

Vector Space and their Dual Spaces
---

Ring and Module
---

Tensor Product
---

Closed Monoidal Category
---

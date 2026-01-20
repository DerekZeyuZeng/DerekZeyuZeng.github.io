---
title: 'Answer to Selected Problems in Introduction to Smooth Manifolds by John M. Lee'
date: 2026-01-19
permalink: /posts/2026/01/Problem-Lee/
tags:
  - Math&Physics Problems
  - Geometry & Topology
  - Living Post
---
This is my answer for some selected problem in the book *Introduction to Smooth Manifolds* by Professor John M. Lee, as a preperation to the further study of Geometry and Topology.

Problem 1-6
---

Show that if $M$ is a smooth manifold with a smooth structure $\mathcal A$, then there are uncountably many non-compactable smooth structures on $M$.

*Proof.* We shall construct uncountably many noncompactable smooth structures based on $\mathcal A$. Take the chart $(U,\varphi) \in \mathcal A$ such that $\varphi(U) = B^n$ and $\varphi(p)=0$ for some $p\in U$.

First of all, we claim that $F_s: B^n \to B^n$, $x \mapsto \lVert x \rVert^{s-1}x$ is a homeomorphism $\forall s > 0$.

Bijectivity: $\forall x \in B^n$, let $r = \lVert x \rVert \in [0,1)$, then every element $x \in B^n$ can be written as $x = ru$ for some $u := x / \lVert x \rVert \in S^{n-1}$. Then, the map can be explicitly written as
$$
F_s(ru) = r^s u
$$
We shall claim that $F_s^{-1} = F_{1/s}$ since
$$
F_s \circ F_{1/s}(ru) = F_s(r^{1/s}u) = (r^{1/s})^su = ru
$$
Thus, $F_s$ is bijective since it has both left and right inverses.

Continuity: Note that $F_s(x) = g(x)x$, where $g: \R^n \to \R$ is given by $g(x) = \lVert x \rVert^{s-1}$. Since $g$ is clearly continuous when $x\neq 0$, we suddenly know that $F_s$ is continuous $\forall s > 0$ when $x \neq 0$. For $x = 0$, notice that
$$
\lVert F_s(x) - F_s(0) \rVert = \lVert F_s(x) \rVert = \lVert x \rVert^s \xrightarrow{x \to 0} 0
$$
$F_s$ is continuous everywhere on $B^n$.

$F_s$ is not a diffeomorphism: Since $\forall  \neq s > 0$, either $s$ or $1/s$ are less that 1, so we shall prove $F_s$ is not differentiable $\forall s \in (0, 1)$. The result is obvious since
$$
{\lVert F_s(x) - F_s(0) \rVert \over \lVert x \rVert} = \lVert x \rVert^{s-1} \xrightarrow{x \to 0} \infty
$$
$F_s$ is not differentiable at $x = 0$ for any $s \in (0,1)$. We shall also show that $F_s$ is smooth at every point $x \neq 0$. When $x \neq 0$, the map can be write explicitly as
$$
F_s(x) = (x_1^2 + \cdots + x_n^2)^{s-1\over 2} (x_1, \dots, x_n)
$$
since $(x_1^2 + \cdots + x_n^2)^{s-1\over 2}$ is a smooth function, $F_s(x)$ is smooth when $x \neq 0$.

In summary, $F_s$ is a homeomorphism but not a diffeomorphism.

Based on the given $C^\infty$-structure $\mathcal A$. $\forall s > 0$
$$
\mathcal A_s := \big\{(U, \varphi_s := F_s \circ \varphi)\big\} \cup \big\{(V, \psi) \mid p \notin V \big\}
$$
This is indeed a smooth atlas since for any $(V_1, \psi_1)$ and $(V_2, \psi_2)$ that do not contain $p$, the smooth compatibility is given by the smooth compactibility of $\mathcal A$. For any $(V, \psi)$ and $(U, \varphi_s)$, the transition map is given by
$$
\varphi_s \circ \psi^{-1} = F_s \circ \varphi \circ \psi^{-1}
$$
is still smooth since $p \notin V$ and $F_s$ is smoorh on $B^n \setminus \{0\}$.

Then we shall claim that $\forall s \neq t > 0$, $\mathcal A_t$ and $\mathcal A_s$ are not smoothly compatible. We shall check the transition map on $U$:
$$
\varphi_s \circ \varphi_t^{-1} = F_s \circ \varphi \circ \varphi^{-1} \circ F_{1/t} = F_{s/t}
$$
is not a diffeomorphism unless $s = t$. Thus, by the uncountablity of $[0,1)$, $\mathcal A_s$ gives a familty of uncountably many non=compactible smooth atlas, and each of the atlas gives a smooth structure on $M$. $\qquad \square$

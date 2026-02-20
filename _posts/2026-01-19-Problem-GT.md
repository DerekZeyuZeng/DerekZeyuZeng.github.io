---
title: 'Answer to Selected Problems of Geometry & Topology'
date: 2026-01-19
permalink: /posts/2026/01/Problem-GT/
tags:
  - Math&Physics Problems
  - Geometry & Topology
  - Living Post
---
This is my answer for some selected problem in several textbooks of geometry and topology, as a preperation to the further study of Geometry and Topology.

Lee, *Introduction to Smooth Manifolds*
---

**1-6**. Show that if $M$ is a smooth manifold with a smooth structure $\mathcal A$, then there are uncountably many non-compactable smooth structures on $M$.

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

**10-1**. Let $E \to S^1$ be the Möbius bundle on $S^1$.

Let $E:= \mathbb{R}^2/\sim$ with the equivalence class defined by $(x,y) \sim (x', y')$ if and only if $(x', y') = \big(x+n, (-1)^ny\big)$ for some $n \in \mathbb{Z}$, and $q: \R^2 \to E$ be quotient map.

**Defn**. Let $\epsilon: \R \to S^1$ be the covering map defined by $\epsilon(x):= \mathrm{e}^{2\pi i x}$, the projection of Möbius bundle is given by $\pi \circ q := \epsilon \circ \mathrm{proj}_1$. In other words, the following diagram commutes:

<div class="tikz-diagram">
  <script type="text/tikz">
    \begin{tikzcd}
      \ar[d,"\mathrm{proj}_1"] \mathbb{R}^2 \ar[r, "q"] & E \ar[d, "\pi", \dashed]\\
      \mathbb{R} \ar[r, "\epsilon"] & S^1
    \end{tikzcd}
  </script>
</div>

Milnor, *Topology from Differentiable Viewpoints*
---

**1**. Let $M, N, P$ be oriented, closed, smooth manifolds, $f: M \to N$ and $g: N \to P$ be smooth maps. Show that for smooth maps $f: M \to N$ and $g: N \to P$, the Brouwer degree satisfies $\deg(g \circ f) = \deg g \cdot \deg f$.

*Proof*. Recall that the definition of Brouwer degree in Milnor's book is given by define the sign of the pushforward $f_{*,x}$ as $\mathrm{sgn} f_{*,x} = 1$ if $f_{*,x}$ is orientation preserving and $\mathrm{sgn} f_{*,x} = -1$ if $f_{*,x}$ is orientation reversing. Then for any regular value $y \in N$
$$
\deg(f; y):= \sum_{x \in f^{-1}(y)} \mathrm{sgn}(f_{*,x})
$$
This degree does not depends on the choice of regular value.

Then, by Sard's theorem, we know that since both $f$ and $g$ are smooth, the critical value of $\mathrm{Crit}(f)$, $\mathrm{Crit}(g)$, and $\mathrm{Crit}(g \circ f)$ has measure-zero. Thus, the set $g(\mathrm{Crit}(g))$,
$$
S = P \setminus \big( \mathrm{Cirt}(g) \cup \mathrm{Crit}(g \circ f) \cup g(\mathrm{Circ}(f)) \big) \ \text{measure zero.}
$$
Thus, we shall pick $p \in S$ such that $p$ is regular value of both $g$ and $g \circ f$, ${g^{-1}}(p) \cap \mathrm{Crit}(f) = \emptyset$. Note that with the choice of framing $\beta:=\{e_1, \dots, e_n\}$ on $T_xM$ and $\tilde \beta:=\{\tilde e_1, \dots, \tilde e_n\}$, then the sign of the linear map is just
$$
\mathrm{sgn}(f_{*,x}) = \mathrm{sgn}(\det [f_{*,x}]_{\beta_1}^{\beta_2})
$$
where the section $\mathrm{sgn}$ is just the sign of a real number. Since the differential/pushforward is functorial, $(g\circ f)_{*,x} = g_{*,f(x)}\circ f_{*,x}$ and the property of determinant gives
$$
\mathrm{sgn}(g \circ f)_{*,x} = \mathrm{sgn}\big(\det[(g \circ f)_{*,x}]\big) = \mathrm{sgn}(\det[g_{*,f(x)}] \det[f_{*,x}]) = \mathrm{sgn}(g_{*,f(x)}) \mathrm{sgn}(f_{*,x})
$$
So the Brouwer degree is given by
$$
\deg(g \circ f;p) = \sum_{x \in (g\circ f)^{-1}(p)} \mathrm{sgn}(g_{*,f(x)})\cdot \mathrm{sgn}(f_{*,x})
$$
We claim that this is equal to $\deg f \cdot \deg g$ since the equation above is just
$$
\deg(g\circ f) = \sum_{y \in g^{-1}(p)} \mathrm{sgn}(g_{*, y}) \cdot \sum_{x \in f^{-1}(y)} \mathrm{sgn}(f_{*,x}) = \deg(g) \cdot \deg(f)
$$
Which completes the proof. $\qquad \square$

**2**. Show that every complex polynomial of degree $n$ gives rise to a smooth map from the Gauss sphere $S^2$ to itself of degree $n$.

*Proof*. Recall that the degree is homotopy invariant. It is enough to show that $p \in \mathbb{C}[z]$ with $\mathrm{deg}(p) = n$ is homotopic to $z^n$, and $\mathrm{deg}(z^n) = n$. We first define the extended polynomial on Gaussian sphere $S^2 \cong \widehat{\mathbb{C}} = \mathbb{C} \cup \{\infty\}$ as
$$
\tilde{p}(z) =
\begin{cases}
  p(z), & z \in \mathbb{C}\\
  \infty, & z = \infty
\end{cases}
, \quad p(z) = z^n + a_{n-1}z^{n-1} + \cdots + a_1z + a_0
$$
Then consider the homotopy $h: \widehat{\mathbb{C}}\times [0,1] \to \widehat{\mathbb{C}}$ defined by
$$
h(x, t):=
\begin{cases}
  p_t(z), & z \in \mathbb{C}\\
  \infty, & z = \infty
\end{cases}
, \quad p_t(z):= z^n + t \big(a_{n-1}z^{n-1} + \cdots + a_1z + a_0\big)
$$
We may check that this is a continuous homotopy by check the continuity near $\infty$ (since $p_t(z) \in \mathbb{C}[z]$ is known to be continuous on $\mathbb{C}$). Consider the limit $z \to \infty$
$$
p_t(z) = z^n\left[1 +  t\Big({a_{n-1}\over z} + \cdots + {a_1 \over z^{n-1}} + {a_0 \over z^n}\Big)\right] \longrightarrow \infty \quad \forall t \in [0,1]
$$
Thus, forall sequence $z_n \to \infty$ we have $p_t(z_n) \to \infty$, which shows $p_t$ is an continuous homotopy on $\widehat{\mathbb{C}}$. Since $h: \tilde p(z) \simeq z^n$, as we mentioned previously, $\mathrm{det}(\tilde p) = \mathrm{deg}(z^n)$. Finally, we compute the degree of $z^n$. Take any regular value of $z^n$, for example $1 \in \mathbb{C}$, then
$$
z^n = 1 \implies z \in \{\zeta_k = \mathrm e^{2\pi ik/n} \mid k = 0, \dots, n-1\}
$$
and the derivative is given by $(z^n)' = nz^{n-1} \neq 0$ if $z \neq 0$. Thus,
$$
\mathrm{deg}(z^n) = \sum_{k = 1}^n \mathrm{sgn}(nz^{n-1}|_{\zeta_k}) = n
$$
which complete the proof. $\qquad \square$

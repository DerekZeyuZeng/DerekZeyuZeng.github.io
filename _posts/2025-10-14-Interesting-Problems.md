---
title: 'Short Notes'
date: 2025-10-14
permalink: /posts/2025/10/Interesting-Problems/
tags:
  - Math&Physics Problems
  - Living Post
---
**Introduction:** This is a living post where I log interesting problems and obstacles I encounter across mathematics and physics. This post is updated irregularly.

**Status labels guide navigation**:

- **[UnS]** unsolved,
- **[Ex]** Small exercise/interesting HW problem with answer.
- **[Notes]** Some tips/tricks that amazed me.

A Linear Algebra Practice (2025-10-14)
---

**[Ex]** Let $ A,B\in\mathbb C^{n\times n} $. Prove that
$$
(AB)^n \sim (BA)^n
$$

**Proof** (via Jordan canonical form). Write the Jordan form of any square matrix $M$ as
$$
J(M)=J_{\mathrm{nz}}(M)\oplus J_0(M)
$$
where $J_{\mathrm{nz}}(M)$ collects the Jordan blocks for all nonzero eigenvalues and $J_0(M)$ collects the blocks for the eigenvalue $0$. Then
$$
\big(J(M)\big)^n=\big(J_{\mathrm{nz}}(M)\big)^n\oplus \big(J_0(M)\big)^n
$$

*Lemma 1 (powers of a swapped product).* $\forall k\in\mathbb N$, $B(AB)^k=(BA)^kB$ and $A(BA)^k=(AB)^kA $.

*Proof.* Trivial for $k=1$. If it holds for $k$, then
$$
B(AB)^{k+1} = B(AB)^k(AB) = (BA)^kB(AB) = (BA)^{k+1} B
$$
And the second identity is analogous. $\quad\square$

*Lemma 2 (matching nonzero Jordan structure).* For any $\lambda\neq 0$, the generalized eigenspaces of $AB$ and $BA$ at $\lambda$ have the same dimension and the same Jordan block sizes; equivalently, $J_{\mathrm{nz}}(AB)\sim J_{\mathrm{nz}}(BA)$. \
*Proof.* By Lemma 1, for every $t\ge1$,
$$
(BA-\lambda I)^t\,B=B\,(AB-\lambda I)^t
$$
Hence $B:\ker(AB-\lambda I)^t\longrightarrow \ker(BA - \lambda I)^t$ is an isomorphism (its inverse is induced by $A$). This carries Jordan chains to Jordan chains without changing their lengths, so block sizes match. $\quad\square$

*Lemma 3 (zero blocks vanish after the $n$-th power).* If $J_m(0)$ is a size-$m$ Jordan block at the eigenvalue $0$, then
$$
\big(J_m(0)\big)^n = 0_{m\times m} \qquad (\text{since }m\le n).
$$

*Proof.* $J_m(0)$ is nilpotent of index $m$, and $n\ge m$. $\quad\square$

*Combine.* For a nonzero eigenvalue block $J_r(\lambda)=\lambda(I+N)$, $N^r=0,\ \lambda\neq0$, one has $J_r(\lambda)^n=\lambda^n(I+N)^n$, which is still a single Jordan block of size $r$ (only the eigenvalue changes to $\lambda^n$ ). By Lemma 2,
$$
\big(J_{\mathrm{nz}}(AB)\big)^n \sim \big(J_{\mathrm{nz}}(BA)\big)^n .
$$
On the other hand, $AB$ and $BA$ have the same multiset of **nonzero** eigenvalues, so the algebraic multiplicity of $0$ is the same for both; let it be $m$. By Lemma 3, $\big(J_0(AB)\big)^n=\big(J_0(BA)\big)^n=0_{m\times m}$. Therefore
$$
\big(J(AB)\big)^n = \big(J_{\mathrm{nz}}(AB)\big)^n\oplus 0_{m\times m} \sim \big(J_{\mathrm{nz}}(BA)\big)^n\oplus 0_{m\times m} = \big(J(BA)\big)^n
$$
whence $ (AB)^n \sim (BA)^n$, which completes the proof. $\quad\square$

**Remarks**. More generally, for any $k$ not smaller than the largest size of a Jordan block of $AB$ (equivalently of $BA$) at $0$, one has $(AB)^k\sim (BA)^k$; in particular, $k = n$ always works. If either $A$ or $B$ is invertible, then $AB\sim BA$ without taking powers.

The Hairy Ball Theorem (2025-10-18)
---

**[Ex]** Prove that there is no nowhere vanishing vector fields on $TS^{2n}$, and thus $TS^{2n}$ is not a trivial bundle. Also show that the statement is not true on $TS^{2n+1}$.

**Proof** (Via antipodal map). We embedded $S^{2n+1}$ in $\mathbb{R}^{2n+2}$.

For the odd dimensional cases, consider the the vector field defined by $\forall x \in \mathbb{R}^{2n+2}$
$$
V(x^{1}, \dots, x^{2n+2}) = (x^2, -x^1, \dots, x^{2n+2}, -x^{2n+1})
$$
By considering the dot product
$$
x \cdot V(x) = \sum_{i = 1}^{n + 1} (x^i x^{i+1} - x^{i + 1} x^1) = 0
$$
And the fact that $S^{2n + 1} := \{x \in \mathbb{R}^{2n+2} | \|x\|^2 = 1\}$ is the level set of $\|x\|^2$. The normal vector on the hypersurface is given by $\hat n_x = \nabla\|x\|^2 = 2x$, and
$$
\hat n_x \cdot V(x) = 2 x \cdot V(x) = 0
$$
we have shown that $V(x)$ is always tangent to the hypersphere $S^{2n+1}$. Also, if $V(x) = 0$, then
$$
V(x) = (x^2, -x^1, \dots, x^{2n+2}, -x^{2n+1}) = 0 \implies x^i = 0 \, \forall i
$$
the fact that $(0, \dots, 0) \notin S^{2n+1}$ make $V(x)$ been no where vanishing.

For the even dimensional cases, suppose $\exists V(x) \in \Gamma^\infty(TS^{2n})$ is a nonvanishing vector field on $S^{2n}$, take $U(x) = {V(x) \over \|V(x)\|}$, since $V(x)$ no-where vanishing, $U(x)$ is well-defined and globally smooth on $S^{2n}$. Then, consider the following construction: $\forall s \in [0, 1]:$
$$
F(x, s) = x \cos(\pi s) + U(x) \sin(\pi s)
$$
which is a continuous map on $S^{2n}$ such that $F(x, 0) = x$ and $F(x, 1) = -x$. With this continuous path, it is sufficient to considet the 2-dimensional subspace $P_x = \mathrm{Span}\{x, U(x)\}$ and associate each point on the path $F(x, -)$ to a matrix in $O(2)$ by considering the matrix rotate $F(x, s)$ back to $x$:
$$
R_x(s) = \begin{pmatrix}
  \cos(\pi s) & -\sin(\pi s)\\
  \sin(\pi s) & \cos(\pi s)
\end{pmatrix}
$$
Thus, by $R_x: [0, 1] \to O(2)$, we construct a path in $O(2)$ connected $I_2$ and $-I_2$, which leads to contradiction since $I_2$ and $-I_2$ are in different connected component in $O(2)$. Thus, there is no no-where vanishing vector field on $S^{2n}$. $\quad\square$

A Simple Proof of the Open Mapping Theorem (2025-12-1)
---

**[Ex]** Let $U \subseteq \mathbb{C}$ be a domain, if complex valued function $f: U \to \mathbb{C}$ is holomorphic and non-canstant, then $f$ is an open map.

**Proof** (Via the Property of Submersion). By Cauchy-Riemann Equation

---
title: 'Interesting Problems'
date: 2025-10-14
permalink: /posts/2025/10/Interesting-Problems/
tags:
  - Math&Physics Problems
  - Living Post
---
**Introduction:** This is a living post where I log interesting problems and obstacles I encounter across mathematics and physics. This post is updated irregularly; a concise changelog is kept at the end. 

**Status labels guide navigation**:
  - **[Open]** unsolved,
  - **[WIP]** in progress,
  - **[Solved]** with a brief proof/idea,
  - **[Ex]** Small exercise/interesting HW problem.
  - **[Note]** Personal thoughts, literature, or folklore. 

A linear algebra practice (2025-10-14). 
---
**[Ex]** Let \\( A,B\in\mathbb C^{n\times n} \\). Prove that \\( (AB)^n \sim (BA)^n \\).

**Proof** (via Jordan canonical form). Write the Jordan form of any square matrix \\(M\\) as

$$
J(M)=J_{\mathrm{nz}}(M)\oplus J_0(M)
$$

where \\(J_{\mathrm{nz}}(M)\\) collects the Jordan blocks for all nonzero eigenvalues and \\(J_0(M)\\) collects the blocks for the eigenvalue \\(0\\). Then

$$
\big(J(M)\big)^n=\big(J_{\mathrm{nz}}(M)\big)^n\oplus \big(J_0(M)\big)^n
$$

*Lemma 1 (powers of a swapped product).* \\(\forall k\in\mathbb N\\), \\(B(AB)^k=(BA)^kB\\) and \\(A(BA)^k=(AB)^kA \\). \
*Proof.* Trivial for \\(k=1\\). If it holds for \\(k\\), then

$$
B(AB)^{k+1} = B(AB)^k(AB) = (BA)^kB(AB) = (BA)^{k+1} B
$$

And the second identity is analogous. \\(\square\\)

*Lemma 2 (matching nonzero Jordan structure).* For any \\(\lambda\neq 0\\), the generalized eigenspaces of \\(AB\\) and \\(BA\\) at \\(\lambda\\) have the same dimension and the same Jordan block sizes; equivalently, \\(J_{\mathrm{nz}}(AB)\sim J_{\mathrm{nz}}(BA)\\). \
*Proof.* By Lemma 1, for every \\(t\ge1\\),

$$
(BA-\lambda I)^t\,B=B\,(AB-\lambda I)^t
$$

Hence \\(B:\ker(AB-\lambda I)^t\longrightarrow \ker(BA - \lambda I)^t\\) is an isomorphism (its inverse is induced by \\(A\\)). This carries Jordan chains to Jordan chains without changing their lengths, so block sizes match. \\(\square\\)

*Lemma 3 (zero blocks vanish after the $n$-th power).* If \\(J_m(0)\\) is a size-\\(m\\) Jordan block at the eigenvalue \\(0\\), then

$$
\big(J_m(0)\big)^n = 0_{m\times m} \qquad (\text{since }m\le n).
$$

*Proof.* \\(J_m(0)\\) is nilpotent of index \\(m\\), and \\(n\ge m\\). \\(\square\\)

*Combine.* For a nonzero eigenvalue block \\(J_r(\lambda)=\lambda(I+N)\\), \\(N^r=0,\ \lambda\neq0\\), one has \\(J_r(\lambda)^n=\lambda^n(I+N)^n\\), which is still a single Jordan block of size \\(r\\) (only the eigenvalue changes to \\(\lambda^n\\) ). By Lemma 2,

$$
\big(J_{\mathrm{nz}}(AB)\big)^n \sim \big(J_{\mathrm{nz}}(BA)\big)^n .
$$

On the other hand, \\(AB\\) and \\(BA\\) have the same multiset of **nonzero** eigenvalues, so the algebraic multiplicity of \\(0\\) is the same for both; let it be \\(m\\). By Lemma 3, \\(\big(J_0(AB)\big)^n=\big(J_0(BA)\big)^n=0_{m\times m}\\). Therefore

$$
\big(J(AB)\big)^n = \big(J_{\mathrm{nz}}(AB)\big)^n\oplus 0_{m\times m} \sim \big(J_{\mathrm{nz}}(BA)\big)^n\oplus 0_{m\times m} = \big(J(BA)\big)^n
$$

whence \\( (AB)^n \sim (BA)^n\\), which completes the proof. \\(\square\\)

**Remarks**
1. More generally, for any \\(k\\) not smaller than the largest size of a Jordan block of \\(AB\\) (equivalently of \\(BA\\)) at \\(0\\), one has \\((AB)^k\sim (BA)^k\\); in particular, \\(k=n\\) always works.  
2. If either \\(A\\) or \\(B\\) is invertible, then \\(AB\sim BA\\) without taking powers.






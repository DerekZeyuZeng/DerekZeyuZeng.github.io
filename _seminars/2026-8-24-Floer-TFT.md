---
title: "2026 Fall Reading: Bordism and Floer Field Theories"
collection: seminars
permalink: /seminars/26fa/
date: 2026-08-22
end_date: 2026-12-10
author_profile: true
published: true
---

This page serves as the homepage for our informal fall 2026 reading seminar on bordism and Floer field theories. The main theme is to explore how ideas from bordism and topological field theory connect to the geometric and algebraic structures that appear in Floer theory.

The seminar runs from August 24 to December 10, 2026, and is organized as a slow, discussion-driven reading cycle. We work through definitions, examples, and key constructions together, with an emphasis on understanding the geometric and topological meaning behind the algebraic machinery.

The current plan is to begin with the basic language of cobordism, then move toward the functorial viewpoint of topological field theories, and finally connect these ideas to Floer-theoretic and related geometric constructions.

## Tentative Weekly Schedule

The schedule is organized around a single guiding theme:

> How does geometric cutting and gluing give rise to functorial, Floer-theoretic, and homotopical structures?

Each meeting will focus on a small collection of definitions, one principal theorem or construction, and at least one concrete example. The schedule may be adjusted according to the backgrounds and interests of the participants.

**Prerequisites.** Participants should be comfortable with basic smooth manifold theory and algebraic topology, including vector bundles, orientations, transversality, homology and cohomology, CW complexes, and elementary homotopy theory. Familiarity with basic category theory—categories, functors, natural transformations, tensor products, and universal properties—is also expected. Prior exposure to Morse theory, symplectic geometry, spectra, or Floer theory will be helpful but is not required for the first half of the seminar. Additional background needed for the later topics, including J-holomorphic curves, Fredholm theory, stable homotopy theory, and higher categories, will be introduced selectively. The aim of the advanced readings is to understand their principal constructions and structural ideas rather than all analytic or higher-categorical foundations.

Weeks 1–5 constitute the common core; Weeks 6–17 are progressively more advanced and may be adjusted according to the participants’ backgrounds.

### Week 1 & 2 (Aug. 22 & 29) — Classical bordism and Pontryagin–Thom

- **Theme:** Bordism groups, framed manifolds, the unstable Pontryagin–Thom construction, and the relation between geometric bordisms and stable homotopy.
- **References:**
  - [Dan Freed, *Bordism: Old and New*, Lectures 1–3](https://people.math.harvard.edu/~dafr/M392C-2012/index.html)

### Week 3 (Sep. 5) — Stabilization of the Pontryagin–Thom Isomorphism

- **Theme:** Stable version of the Pontryagin–Thom construction and stable homotopy. Some aspects of classifying spaces, characteristic classes, and Thom isomorphisms.
- **References:**
  - [Dan Freed, Lectures 2–5](https://people.math.harvard.edu/~dafr/M392C-2012/index.html)

### Week 4 (Sep. 12) — Classifying spaces

- **Theme:** Grassmannian and classifying spaces.
- **References:**
  - [Dan Freed, Lectures 6–8](https://people.math.harvard.edu/~dafr/M392C-2012/index.html)

### Week 5 (Sep. 19) — More Stable Homotopy Theory

- **Theme:** Suspension and loop spaces, spectra and their homotopy groups, level/stable equivalences of spectra, and cofibrant replacement.
- **References:**
  - [David Barnes and Constanze Roitzheim, Foundations of Stable Homotopy Theory](https://www.cambridge.org/core/books/foundations-of-stable-homotopy-theory/791C9C413A83AD7094E055E5E818D33B)
  - [Dan Freed, Lectures 4 & 5](https://people.math.harvard.edu/~dafr/M392C-2012/index.html)
  - [Dan Freed, Lecture 10: Thom Spectra and X-Bordism](https://people.math.harvard.edu/~dafr/M392C-2012/Notes/lecture10.pdf)

### Week 6 (Oct. 3) — Pontryagin–Thom via Thom spectra

- **Theme:** Thom spaces, and the passage from bordism groups to spectrum-level organization.
- **References:**
  - [Dan Freed, Lecture 10: Thom Spectra and X-Bordism](https://people.math.harvard.edu/~dafr/M392C-2012/Notes/lecture10.pdf)

### Week 7 (Oct. 10) — Tangential Structure

- **Theme:** Reduction of structure groups and tangential structures.
- **References:**
  - [Dan Freed, Lecture 9 & 10](https://people.math.harvard.edu/~dafr/M392C-2012/)

### Week 8 (Oct. 19) — Atiyah–Segal axioms and duality in symmetric monoidal categories

- **Theme:** The oriented bordism category, with closed $(n-1)$-manifolds as objects and diffeomorphism classes of $n$-dimensional bordisms as morphisms; gluing as composition and disjoint union as the symmetric monoidal product. Formulate an oriented TQFT as a symmetric monoidal functor $Z:\mathrm{Bord}^{\mathrm{or}}_n\to\mathrm{Vect}_k$. Introduce evaluation, coevaluation, and the two snake identities, and explain why duality in the bordism category forces the state spaces of a vector-space-valued TQFT to be finite-dimensional.
- **Example and discussion:** Match cylinders with identity maps and the empty manifold with the tensor unit. For a finite-dimensional vector space $V$, write evaluation and coevaluation using a basis and its dual, verify the snake identities, and interpret them by gluing intervals. This gives the one-dimensional model for the surface constructions in Week 9.
- **Core reading:**
  - [Dan Freed, Lecture 13: *An Introduction to TQFT*, pp. 5–7](https://people.math.harvard.edu/~dafr/M392C-2012/Notes/lecture13.pdf) — symmetric monoidal categories and functors.
  - [Dan Freed, Lecture 14: *Bordism Categories*](https://people.math.harvard.edu/~dafr/M392C-2012/Notes/lecture14.pdf) — the bordism category and Definition 14.20 of a TQFT.
  - [Dan Freed, Lecture 15: *Duality*, pp. 3–7](https://people.math.harvard.edu/~dafr/M392C-2012/Notes/lecture15.pdf) — dualizability, the snake identities, and Theorem 15.36 on duality in TQFT.
- **Supplementary reading:**
  - [Michael Atiyah, *Topological Quantum Field Theories*, §2, pp. 177–180](https://www.numdam.org/item/PMIHES_1988__68__175_0.pdf) — compare the original axioms with the functorial formulation.
  - [Dan Freed, Lecture 16: *1-Dimensional TQFTs*](https://people.math.harvard.edu/~dafr/M392C-2012/Notes/lecture16.pdf) — categorical dimension and the classification of oriented one-dimensional theories.

### Week 9 (Oct. 24) — Classification of oriented 2D TQFTs and examples

- **Theme:** Decompose oriented surfaces into disks, cylinders, and pairs of pants. Read these bordisms as the unit, counit, multiplication, and comultiplication on $A=Z(S^1)$, and derive the Frobenius relations from gluing. Explain the classification of oriented two-dimensional TQFTs by finite-dimensional commutative Frobenius algebras, up to isomorphism, including how the algebra reconstructs the maps assigned to surfaces.
- **Example and discussion:** Work out $A=k[x]/(x^2)$ with counit $\varepsilon(1)=0$ and $\varepsilon(x)=1$. Check that the pairing $\langle a,b\rangle=\varepsilon(ab)$ is nondegenerate, determine the comultiplication, and compute the invariants of the sphere and torus by cutting and gluing. Use the handle operator to extend the calculation to higher-genus surfaces.
- **Core reading:**
  - [Dan Freed, Lecture 23: *An Application of Morse–Cerf Theory*, pp. 4–9](https://people.math.harvard.edu/~dafr/M392C-2012/Notes/lecture23.pdf) — Frobenius algebras, examples, and the classification theorem (Definition 23.20 and Theorem 23.27); review pp. 1–4 for the Morse–Cerf argument behind independence of a surface decomposition.
  - [Joachim Kock, *Frobenius Algebras and 2D Topological Quantum Field Theories*, §3.3](https://doi.org/10.1017/CBO9780511615443) — the classification, with §1.4 for generators and relations and §§2.2–2.3 for Frobenius algebras and comultiplication. See also the [author's corrections](https://mat.uab.cat/~kock/TQFT.html).
- **Supplementary reading:**
  - [Jacob Lurie, *On the Classification of Topological Field Theories*, §1.1, Example 1.1.11 and Definition 1.1.12; §1.2, Example 1.2.1](https://arxiv.org/abs/0905.0465) — a concise view of the two-dimensional classification and closed-surface invariants.

### Weeks 10 & 11 — Cobordism categories and stable homotopy

- **Theme:** The homotopical structure of cobordism categories and the role of Thom spectra in classifying them.
- **References:**
  - [Dan Freed, Lecture 20: Topological Bordism Categories](https://people.math.harvard.edu/~dafr/M392C-2012/Notes/lecture20.pdf)
  - [Galatius–Madsen–Tillmann–Weiss, *The Homotopy Type of the Cobordism Category*](https://arxiv.org/abs/math/0605249)

### Week 12 — Extended field theories and the Cobordism Hypothesis

- **Theme:** Higher bordism categories, dualizability, and the classification principle for extended TQFTs.
- **References:**
  - [Dan Freed, Lecture 24: The Cobordism Hypothesis](https://people.math.harvard.edu/~dafr/M392C-2012/Notes/lecture24.pdf)
  - [Daniel Freed, *The Cobordism Hypothesis*](https://arxiv.org/abs/1210.5100)
  - [Jacob Lurie, *On the Classification of Topological Field Theories*, §§1–2](https://arxiv.org/abs/0905.0465)

### Week 13 — Floer field philosophy and Cerf decompositions

- **Theme:** Passing from bordism-based field theories to Floer-theoretic constructions via Cerf decompositions and symplectic categories.
- **References:**
  - [Katrin Wehrheim, *Floer Field Philosophy*, §§2.1–2.4](https://arxiv.org/abs/1602.04908)
  - [Dan Freed, Lecture 23: An Application of Morse–Cerf Theory](https://people.math.harvard.edu/~dafr/M392C-2012/Notes/lecture23.pdf)

### Week 14 — Lagrangian correspondences and gauge–Floer theory

- **Theme:** Geometric composition, Lagrangian correspondences, and the Atiyah–Floer viewpoint on field-theoretic assignments.
- **References:**
  - [Katrin Wehrheim, *Floer Field Philosophy*, §§2.5–2.6](https://arxiv.org/abs/1602.04908)
  - [Wehrheim–Woodward, *Functoriality for Lagrangian Correspondences in Floer Theory*](https://arxiv.org/abs/0708.2851)
  - [Michael Atiyah, *New Invariants of 3- and 4-Dimensional Manifolds*](https://math.berkeley.edu/~gbeiner/texts/Atiyah_Invariants.pdf)

### Week 15 — Symplectic field theory and cobordism maps

- **Theme:** Contact geometry, holomorphic curves, and the geometric origin of cobordism maps in symplectic field theory.
- **References:**
  - [Hind–Siegel, *Symplectic Field Theory: An Overview*](https://arxiv.org/abs/2410.19936)
  - [Eliashberg–Givental–Hofer, *Introduction to Symplectic Field Theory*](https://arxiv.org/abs/math/0010059)
  - [John Pardon, *Contact Homology and Virtual Fundamental Cycles*](https://arxiv.org/abs/1508.03873)

### Week 16 — Floer homotopy types and moduli spaces

- **Theme:** Flow categories, framed moduli spaces, and the passage from Floer chain complexes to spectrum-valued invariants.
- **References:**
  - [Ralph Cohen, *Floer Homotopy Theory, Revisited*](https://arxiv.org/abs/1901.08694)
  - [Abouzaid–Blumberg, *Foundation of Floer Homotopy Theory I: Flow Categories*](https://arxiv.org/abs/2404.03193)
  - [John Pardon, *Representability in Non-linear Elliptic Fredholm Analysis*](https://arxiv.org/abs/2401.00184)

### Week 17 — Toward spectral Floer field theories

- **Theme:** Synthesis of bordism, Floer theory, and flow-category/spectral viewpoints into a prospective field-theoretic framework.
- **References:**
  - [Chanda–Hirschi, *A Contact Homotopy Type*](https://arxiv.org/abs/2511.01821)
  - [Abouzaid–Blumberg, *Foundation of Floer Homotopy Theory I*](https://arxiv.org/abs/2404.03193)
  - [Katrin Wehrheim, *Floer Field Philosophy*, concluding sections](https://arxiv.org/abs/1602.04908)

## Working notes

Here is the current working note for the seminar:

- Notes on Bordism and Floer Field Theories ([PDF]({{ '/files/Bordism-Floer.pdf' | relative_url }}))
- View the note in [Writings]({{ '/writings/bordism-floer/' | relative_url }})

Related working notes:

- [Morse Theory of Homotopy Type: The Cohen–Jones–Segal Construction]({{ '/writings/morse-theory-homotopy-type/' | relative_url }}) ([PDF]({{ '/files/Morse_Floer_Htpy.pdf' | relative_url }})) — a draft for the Fall 2026 Morse theory course, developing the flow-category viewpoint relevant to Weeks 16–17.

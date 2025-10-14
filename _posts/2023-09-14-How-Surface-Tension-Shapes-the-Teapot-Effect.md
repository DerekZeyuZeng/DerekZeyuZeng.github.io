---
title: 'How Surface Tension Shapes the Teapot Effect'
date: 2023-09-14
permalink: /posts/2023/09/How-Surface-Tension-Shapes-the-Teapot-Effect/
tags:
  - Fluid Mechanics
  - Teapot Effect
---

**Idea.** A fast, thin sheet of liquid curves around the teapot rim. Inertia demands a normal (centripetal) pressure drop, while capillarity (via the meniscus set by the contact angle) provides adhesion over the wetted sector. The competition sets whether the stream detaches cleanly or dribbles down the spout.

Geometry and assumptions
-----
Thin film of thickness \(e_0\) flows at speed \(U\) over a rounded rim of radius \(r_i\). The streamline curvature is \(R\simeq r_i+\alpha e_0\) with \(\alpha\sim \tfrac12\). We neglect viscosity and gravity at high Reynolds and Froude numbers; how to include gravity is noted below. Let \(\delta\psi_0\) be the small deflection angle needed for detachment; the total wetted angular span is
$$
\psi_{\text{wet}}=\delta\psi_0+\psi_{\text{men}}.
$$

Curvature-induced pressure drop
-----
Inertia across the film thickness yields a normal pressure drop
$$
|\Delta P| \;\approx\; \rho\,\frac{U^2\,e_0}{R}.
$$

Meniscus from Young–Laplace
-----
The meniscus width follows from the Young–Laplace relation and contact-angle geometry:
$$
\psi_{\text{men}} \;=\; \left[\frac{2\,\gamma\,(1+\cos\theta)}{r_i\,|\Delta P|}\right]^{1/2}.
$$

Momentum balance (per unit span)
-----
Horizontal momentum-flux change for a small detachment angle is
$$
D \;=\; \rho U^2 e_0\,(1-\sin\psi_0)\;\simeq\;\tfrac12\,\rho U^2 e_0\,\delta\psi_0^{\,2}.
$$
The capillary-adhesion force (horizontal component) over the wetted arc is
$$
F_x \;\approx\; \frac{|\Delta P|\,r_i}{2}\,\big(\delta\psi_0+\psi_{\text{men}}\big)^2.
$$
Set \(D=F_x\), introduce the Weber number \( \mathrm{We}=\rho U^2 e_0/\gamma \), and use \(R\simeq r_i+\alpha e_0\) to obtain the compact result
$$
\boxed{\,\delta\psi_0 \;=\; \sqrt{\frac{F[r_i/R]\,(1+\cos\theta)}{\mathrm{We}}}\,},\qquad 
F[r_i/R]\simeq 2\big(1-\sqrt{r_i/R}\big)^2.
$$

Critical Weber number (detachment criterion)
-----
If clean detachment needs \(\delta\psi_0\ge \delta\psi_0^{\min}\), then
$$
\boxed{\,\mathrm{We}_c \;\propto\; \Big(\frac{r_i}{e_0}\Big)^{\!2}\,(1+\cos\theta)\,}.
$$
Thus, a larger contact angle (hydrophobicity), a sharper rim (smaller \(r_i\)), and a thinner film (smaller \(e_0\)) all favor clean detachment and suppress dribbling.

Gravity (when needed)
-----
At low speeds or strong curvature of the free surface across a height change \(\Delta h\), include hydrostatics as
$$
|\Delta P| \;\approx\; \rho\,\frac{U^2 e_0}{R} \;+\; \rho g\,\Delta h,
$$
and re-evaluate \(\psi_{\text{men}}\); the same balancing structure carries through.

---

**Notation.** \(\rho\): density; \(\gamma\): liquid–gas surface tension; \(\theta\): static contact angle; \(e_0\): film thickness; \(r_i\): rim radius; \(R\): streamline curvature radius; \(\psi_{\text{men}}\): meniscus angular width; \(\delta\psi_0\): detachment angle; \(\mathrm{We}\): Weber number.

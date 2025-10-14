---
title: 'Teapot–dripping as an inertia–capillarity competition (expanded, single-thread derivation with checks and extensions)'
date: 2023-09-14
permalink: /posts/2023/09/How-Surface-Tension-Shapes-the-Teapot-Effect/
tags:
  - Fluid Mechanics
  - Teapot Effect
---

**Setup and leading-order assumptions.** Consider a thin liquid film of uniform thickness \(e_0\) approaching a rounded rim of inner radius \(r_i\) with speed \(U\) (per-unit span in the out-of-plane direction). The local streamline bends around the rim with a curvature radius \(R\approx r_i+\alpha e_0\) where \(\alpha=\mathcal{O}(1)\) (for a nearly plug-like profile, \(\alpha\simeq \tfrac12\) captures that the streamline centroid sits roughly mid-film from the solid). We work in the high-Reynolds and high-Froude limit so that viscous dissipation and gravity are subdominant in the primary inertial–capillary balance; their controlled inclusion is given later. The liquid partially wets the rim over a small angular sector before it either detaches (clean pour) or continues to follow the rim (dribble). Let \(\delta\psi_0\ll1\) denote the small “detachment deflection” needed for the free stream to clear the rim; denote the total wetted span by \(\psi_{\mathrm{wet}}=\delta\psi_0+\psi_{\mathrm{men}}\), where \(\psi_{\mathrm{men}}\) is the angular width of the meniscus required by wetting at static contact angle \(\theta\).

**Normal (centripetal) pressure drop across the film.** Bending a sheet of speed \(U\) through curvature \(1/R\) requires a centripetal acceleration \(U^2/R\). The corresponding normal pressure gradient across the thickness is \(\partial_n P\sim \rho U^2/R\), so the across-film pressure drop scales as
$$
|\Delta P|\;\approx\;\rho\,\frac{U^2 e_0}{R}.
$$
This is the “adhesive” suction that presses the film against the solid as it attempts to turn the corner; it is purely inertial and independent of surface tension at this stage.

**Meniscus geometry from Young–Laplace and contact-angle kinematics.** Along the wetted arc, a capillary meniscus must connect the solid at contact angle \(\theta\) to the outer free stream. The capillary adhesion arises from the Laplace jump \(\gamma \kappa\) integrated over the wetted arc; in the slender-wedge limit of a thin film wrapping a weakly curved rim, one obtains a meniscus angular width
$$
\psi_{\mathrm{men}}\;=\;\left(\frac{2\gamma\,[1+\cos\theta]}{r_i\,|\Delta P|}\right)^{\!1/2},
$$
which encodes that more hydrophobic surfaces (larger \(\theta\Rightarrow\) smaller \(1+\cos\theta\)) reduce the capillary “grip,” while stronger inertial suction \(|\Delta P|\) or a smaller \(r_i\) both shrink the meniscus sector. Substituting the inertial \(|\Delta P|\) gives the convenient form
$$
\psi_{\mathrm{men}}\;=\;\sqrt{\frac{2(1+\cos\theta)}{\mathrm{We}}\,\frac{R}{r_i}},\qquad 
\mathrm{We}\;\equiv\;\frac{\rho U^2 e_0}{\gamma}.
$$

**Streamwise momentum change vs capillary adhesion (per unit span).** For a small detachment angle \(\delta\psi_0\ll1\), the streamwise momentum-flux change required to redirect the sheet by \(\delta\psi_0\) is
$$
D\;=\;\rho U^2 e_0\,(1-\sin\psi_0)\;\simeq\;\tfrac12\,\rho U^2 e_0\,\delta\psi_0^{2}.
$$
The horizontal component of the capillary-adhesion force integrated over the wetted arc \(\psi_{\mathrm{wet}}=\delta\psi_0+\psi_{\mathrm{men}}\) follows from the Laplace pressure \(|\Delta P|\) acting on the projected area of a rim-annulus of radius \(r_i\):
$$
F_x\;\approx\;\frac{|\Delta P|\,r_i}{2}\,\big(\delta\psi_0+\psi_{\mathrm{men}}\big)^2.
$$
Equating \(D=F_x\) and inserting \(|\Delta P|=\rho U^2 e_0/R\) yields the exact algebraic relation
$$
\delta\psi_0^2\;=\;\frac{r_i}{R}\,\big(\delta\psi_0+\psi_{\mathrm{men}}\big)^2
\quad\Longrightarrow\quad
\delta\psi_0\;=\;\frac{\sqrt{r_i/R}}{1-\sqrt{r_i/R}}\;\psi_{\mathrm{men}}.
$$
Using the expression for \(\psi_{\mathrm{men}}\) above, we obtain the compact detachment-angle formula
$$
\boxed{\;
\delta\psi_0\;=\;\frac{1}{1-\sqrt{r_i/R}}\;\sqrt{\frac{2(1+\cos\theta)}{\mathrm{We}}}\;}.
$$
Equivalently, in the notational form \(\delta\psi_0=\sqrt{F[r_i/R]\,(1+\cos\theta)/\mathrm{We}}\), the shape factor is
$$
\boxed{\;F[r_i/R]\;=\;\frac{2}{\big(1-\sqrt{r_i/R}\big)^{2}}\;},\qquad R\approx r_i+\alpha e_0.
$$
**Sanity checks.** (i) Sharper rim \(r_i\!\downarrow\Rightarrow r_i/R\to0\) gives \(F\to2\) and a *smaller* \(\delta\psi_0\) threshold—detachment is easier. (ii) Blunter rim \(r_i\!\uparrow\Rightarrow \sqrt{r_i/R}\to1^{-}\) makes \(F\) blow up—detachment demands a much larger \(\delta\psi_0\), i.e., stronger tendency to dribble. (iii) Increased hydrophobicity (larger \(\theta\Rightarrow\) smaller \(1+\cos\theta\)) reduces the needed \(\delta\psi_0\), favoring clean pour. All three trends match intuition and experiments.

**Critical Weber number for clean detachment.** Suppose geometric constraints and spout shape demand a minimum \(\delta\psi_0^{\min}\) to clear the rim. The criterion \(\delta\psi_0\ge \delta\psi_0^{\min}\) is equivalent to
$$
\boxed{\;\mathrm{We}_c\;=\;\frac{2(1+\cos\theta)}{\big(1-\sqrt{r_i/R}\big)^{2}\,\big(\delta\psi_0^{\min}\big)^{2}}\;}.
$$
Using \(R\approx r_i+\alpha e_0\) and expanding for \(r_i\gg e_0\),
$$
1-\sqrt{\frac{r_i}{R}}=1-\left(1+\frac{\alpha e_0}{r_i}\right)^{-1/2}\;\simeq\;\frac{\alpha}{2}\,\frac{e_0}{r_i},
$$
so
$$
\mathrm{We}_c\;\simeq\;\frac{8}{\alpha^2}\;\frac{(1+\cos\theta)}{\big(\delta\psi_0^{\min}\big)^{2}}\;\left(\frac{r_i}{e_0}\right)^{\!2}.
$$
Thus the widely quoted scaling \(\mathrm{We}_c\propto (r_i/e_0)^2(1+\cos\theta)\) is recovered with an explicit \(\mathcal{O}(1)\) prefactor set by \(\alpha\) and geometry.

**Gravity, viscosity, and wetting dynamics—controlled corrections.** If Froude number is not large or if the free surface spans a height difference \(\Delta h\) across the wetted arc, include hydrostatics in the adhesion pressure,
$$
|\Delta P|\;\approx\;\rho\,\frac{U^2 e_0}{R}\;+\;\rho g\,\Delta h,
$$
and recom

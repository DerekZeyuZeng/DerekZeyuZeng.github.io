---
title: 'Teapot–Dripping as an Inertia–Capillarity Competition'
date: 2025-10-13
permalink: /posts/2025/10/Teapot–Dripping-as-an-Inertia–Capillarity-Competition/
tags:
  - Physics
  - Fluid Mechanics
  - Teapot Effect
---
**Main Idea.** In the high-\\(Re\\)/high-Froude limit, clean detachment is an inertia–capillarity competition: centripetal suction \\(\sim \rho U^2 e_0 / R\\) and the meniscus set by contact angle \\(\theta\\) provide the capillary grip; detachment occurs when the required deflection \\(\delta\psi_0\\) is smaller than the available meniscus width \\(\psi_{\mathrm{men}}\\), with geometry entering via \\(R \approx r_i + \alpha e_0\\).

**Setup and leading-order assumptions.** Consider a thin liquid film of uniform thickness \\(e_0\\) approaching a rounded rim of inner radius \\(r_i\\) with speed \\(U\\) (per-unit span in the out-of-plane direction). The local streamline bends around the rim with a curvature radius \\(R\approx r_i+\alpha e_0\\) where \\(\alpha=\mathcal{O}(1)\\) (for a nearly plug-like profile, \\(\alpha\simeq \tfrac12\\) captures that the streamline centroid sits roughly mid-film from the solid). We work in the high-Reynolds and high-Froude limit so that viscous dissipation and gravity are subdominant in the primary inertial–capillary balance; their controlled inclusion is given later. The liquid partially wets the rim over a small angular sector before it either detaches (clean pour) or continues to follow the rim (dribble). Let \\(\delta\psi_0\ll1\\) denote the small “detachment deflection” needed for the free stream to clear the rim; denote the total wetted span by \\(\psi_{\mathrm{wet}}=\delta\psi_0+\psi_{\mathrm{men}}\\), where \\(\psi_{\mathrm{men}}\\) is the angular width of the meniscus required by wetting at static contact angle \\(\theta\\).

**Normal (centripetal) pressure drop across the film.** Bending a sheet of speed \\(U\\) through curvature \\(1/R\\) requires a centripetal acceleration \\(U^2/R\\). The corresponding normal pressure gradient across the thickness is \\(\partial_n P\sim \rho U^2/R\\), so the across-film pressure drop scales as

$$
\lvert \Delta P 
vert \approx \rho \frac{U^2 e_0}{R}
$$

This is the “adhesive” suction that presses the film against the solid as it attempts to turn the corner; it is purely inertial and independent of surface tension at this stage.

**Meniscus geometry from Young–Laplace and contact-angle kinematics.** Along the wetted arc, a capillary meniscus must connect the solid at contact angle \\(\theta\\) to the outer free stream. The capillary adhesion arises from the Laplace jump \\(\gamma \kappa\\) integrated over the wetted arc; in the slender-wedge limit of a thin film wrapping a weakly curved rim, one obtains a meniscus angular width

$$
\psi_{\mathrm{men}} = \left(\frac{2\gamma (1+\cos\theta)}{r_i \lvert \Delta P 
vert}\right)^{\!1/2}
$$

which encodes that more hydrophobic surfaces (larger \\(\theta\Rightarrow\\) smaller \\(1+\cos\theta\\)) reduce the capillary “grip,” while stronger inertial suction \\(\lvert \Delta P
vert\\) or a smaller \\(r_i\\) both shrink the meniscus sector. Substituting the inertial \\(\lvert \Delta P
vert\\) gives the convenient form

$$
\psi_{\mathrm{men}} = \sqrt{\frac{2(1+\cos\theta)}{\mathrm{We}} \frac{R}{r_i}},\qquad 
\mathrm{We} \equiv \frac{\rho U^2 e_0}{\gamma}
$$

**Streamwise momentum change vs capillary adhesion (per unit span).** For a small detachment angle \\(\delta\psi_0\ll1\\), the streamwise momentum-flux change required to redirect the sheet by \\(\delta\psi_0\\) is

$$
D = \rho U^2 e_0 (1-\sin\psi_0) \simeq \tfrac12 \rho U^2 e_0 \delta\psi_0^{2}
$$

The horizontal component of the capillary-adhesion force integrated over the wetted arc \\(\psi_{\mathrm{wet}}=\delta\psi_0+\psi_{\mathrm{men}}\\) follows from the Laplace pressure \\(\lvert \Delta P
vert\\) acting on the projected area of a rim-annulus of radius \\(r_i\\):

$$
F_x \approx \frac{\lvert \Delta P
vert r_i}{2} \big(\delta\psi_0+\psi_{\mathrm{men}}\big)^2
$$

Equating \\(D=F_x\\) and inserting \\(\lvert \Delta P
vert=\rho U^2 e_0/R\\) yields the exact algebraic relation

$$
\delta\psi_0^2 = \frac{r_i}{R} \big(\delta\psi_0+\psi_{\mathrm{men}}\big)^2
\quad\Longrightarrow\quad
\delta\psi_0 = \frac{\sqrt{r_i/R}}{1-\sqrt{r_i/R}} \psi_{\mathrm{men}}
$$

Using the expression for \\(\psi_{\mathrm{men}}\\) above, we obtain the compact detachment-angle formula

$$
\delta\psi_0 = \frac{1}{1-\sqrt{r_i/R}} \sqrt{\frac{2(1+\cos\theta)}{\mathrm{We}}}
$$

Equivalently, in the notational form \\(\delta\psi_0=\sqrt{F[r_i/R] (1+\cos\theta)/\mathrm{We}}\\), the shape factor is

$$
F(r_i/R) = \frac{2}{\big(1-\sqrt{r_i/R}\big)^{2}},\qquad R\approx r_i+\alpha e_0
$$

**Sanity checks.** (i) Sharper rim \\(r_i\!\downarrow\Rightarrow r_i/R\to0\\) gives \\(F\to2\\) and a smaller \\(\delta\psi_0\\) threshold—detachment is easier. (ii) Blunter rim \\(r_i\!\uparrow\Rightarrow \sqrt{r_i/R}\to1^{-}\\) makes \\(F\\) blow up—detachment demands a much larger \\(\delta\psi_0\\), i.e., stronger tendency to dribble. (iii) Increased hydrophobicity (larger \\(\theta\Rightarrow\\) smaller \\(1+\cos\theta\\)) reduces the needed \\(\delta\psi_0\\), favoring clean pour. All three trends match intuition and experiments.

**Critical Weber number for clean detachment.** Suppose geometric constraints and spout shape demand a minimum \\(\delta\psi_0^{\min}\\) to clear the rim. The criterion \\(\delta\psi_0\ge \delta\psi_0^{\min}\\) is equivalent to

$$
\mathrm{We}_c = \frac{2(1+\cos\theta)}{\big(1-\sqrt{r_i/R}\big)^{2} \big(\delta\psi_0^{\min}\big)^{2}}
$$

Using \\(R\approx r_i+\alpha e_0\\) and expanding for \\(r_i\gg e_0\\),

$$
1-\sqrt{\frac{r_i}{R}}=1-\left(1+\frac{\alpha e_0}{r_i}\right)^{-1/2} \simeq \frac{\alpha}{2} \frac{e_0}{r_i}
$$

so

$$
\mathrm{We}_c \simeq \frac{8}{\alpha^2} \frac{(1+\cos\theta)}{\big(\delta\psi_0^{\min}\big)^{2}} \left(\frac{r_i}{e_0}\right)^{2}
$$

Thus the widely quoted scaling \\( \mathrm{We}_c \propto(r_i/e_0)^2(1+\cos\theta)\\) is recovered with an explicit \\(\mathcal{O}(1)\\) prefactor set by \\(\alpha\\) and geometry.

**Gravity, viscosity, and wetting dynamics—controlled corrections.** If the Froude number is not large or if the free surface spans a height difference \\(\Delta h\\) across the wetted arc, include hydrostatics in the adhesion pressure,

$$
\\lvert \Delta P \
vert \approx \rho \frac{U^2 e_0}{R} + \rho g \Delta h
$$

and recompute \\(\psi_{\mathrm{men}}\\) via the same formula; this effectively replaces \\(\mathrm{We}\\) by a velocity-dependent \\(\mathrm{We}_{\mathrm{eff}}=\rho U^2 e_0/\gamma\\) inside a square root premultiplied by \\(1/\sqrt{1+\frac{g \Delta h R}{U^2 e_0}}\\), weakening capillary adhesion when gravity assists detachment and strengthening it otherwise. Viscous effects enter in two distinct ways: (i) streamwise dissipation that reduces the available momentum \\(D\\) as the film traverses the arc (a correction of relative size \\(\sim\mathrm{Re}^{-1}(R/e_0)\\) for a laminar film, with \\(\mathrm{Re}=\rho U e_0/\mu\\)), and (ii) dynamic wetting, which alters the effective contact angle via Cox–Voinov,

$$
\theta_d^3 \approx \theta_s^3+9 \mathrm{Ca} \ln\!\left(\frac{L}{\ell}\right),\qquad \mathrm{Ca}=\frac{\mu U}{\gamma}
$$

so one should use \\(1+\cos\theta_d\\) in \\(\psi_{\mathrm{men}}\\) at higher speeds (partial dewetting at large \\(\mathrm{Ca}\\) further reduces adhesion). Both corrections are typically subleading when \\(\mathrm{Re}\gg1\\) and \\(\mathrm{Ca}\ll1\\), consistent with the clean inertial–capillary picture above. Gravity can also be expressed via the Bond number \\(\mathrm{Bo}=(e_0/\ell_c)^2\\) with capillary length \\(\ell_c=\sqrt{\gamma/(\rho g)}\\); appreciable hydrostatics correspond to \\(\mathrm{Bo}\gtrsim \mathcal{O}(1)\\) over the vertical excursion of the meniscus.

**Design and operating knobs (interpreting the formulas).** To suppress dribbling one can (i) decrease \\(r_i\\) (sharper rim) which increases the denominator \\(1-\sqrt{r_i/R}\\) and thus decreases \\(\delta\psi_0\\) at fixed \\(\mathrm{We}\\); (ii) reduce \\(e_0\\) (thinner film) which boosts \\(\mathrm{We_c}\\) at fixed \\(U\\) and also lowers \\(\mathrm{We_c}\\) through the \\((r_i/e_0)^2\\) asymptotics; (iii) increase hydrophobicity (decrease \\( 1+\cos\theta \\)) which shrinks \\(\psi_{\mathrm{men}}\\) and the capillary grip; (iv) increase \\(U\\) (larger \\(\mathrm{We}\\)) up to the point where splashing or air entrainment intervenes; and (v) orient the spout so gravity aids detachment (smaller effective \\(\lvert \Delta P
vert\\) in the square-root denominator within \\(\psi_{\mathrm{men}}\\)). These levers are additive in the sense of the square-root structure, which is why modest improvements in several at once reliably cross the threshold set by \\(\mathrm{We}_c\\).

**Validity envelope and diagnostics.** The central formulae require \\(\delta\psi_0\ll1\\), \\(e_0\ll r_i\\) (for \\(R\approx r_i+\alpha e_0\\) and a thin-wedge meniscus), \\(\mathrm{Re}\gg1\\), \\(\mathrm{Ca}\ll1\\), and negligible air inertia. A quick consistency check is to plot the two angles \\(\delta\psi_0\\) and \\(\psi_{\mathrm{men}}\\) versus \\(U\\): as \\(U\\) increases, \\(\psi_{\mathrm{men}}\propto \mathrm{We}^{-1/2}\\) collapses while \\(\delta\psi_0\\) decreases only as the same square root modulated by the geometric factor \\(1/(1-\sqrt{r_i/R})\\); once \\(\delta\psi_0\\) exceeds the geometric clearance requirement, clean detachment ensues. Finally, note that the *shape factor* above,

$$
F(r_i/R)=\frac{2}{\big(1-\sqrt{r_i/R}\big)^2}
$$

is the mathematically consistent outcome of the exact momentum–adhesion balance; it diverges as \\(r_i/R\to1^{-}\\) (a very blunt rim), correctly signaling the strong propensity to dribble in that limit, and tends to \\(2\\) for a sharp rim \\(r_i/R\to0\\).


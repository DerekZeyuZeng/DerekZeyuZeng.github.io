---
permalink: /
title: "About Me"
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

![宁拙毋巧，宁朴毋华 —— C. N. Yang](/images/CNYang.png)
Favor substance over polish; plainness over flourish. (宁拙毋巧，宁朴毋华) —— C. N. Yang

Hello! My name is Derek Zeng, and I am an undergraduate student at the University of Illinois at Urbana–Champaign, with a dual degree in Mathematics and Physics. My interests lie in geometry, topology, and mathematical physics—especially the relation between modern homotopy theory and differential geometry. I also did some work on general physics (fluid dynamics, particle physics, gravity) on high school and first year in college.

This site is a place where I share my research, talks and presentations, reading seminars, writings, and projects. I hope these resources can inspire others who are exploring mathematics and physics.

Feel free to explore other sections for more details, and reach out via the contact links in the sidebar.

Some Useful Links
----

- [arXiv](https://arxiv.org/)
- [Google Scholar](https://scholar.google.ca/)
- [INSPIRE-HEP](https://inspirehep.net/)
- An excellent [Knots Atlas](https://katlas.org/)
- [SageMath](https://www.sagemath.org/) and an web interface [SageMathCell](https://sagecell.sagemath.org/)
- [Kerodon](https://kerodon.net/), a nice literature about infinity categories.
- [The Stacks Project](https://stacks.math.columbia.edu/)

Miscellaneous
----

### Just for Fun

<div class="gtm-result">
  <img class="gtm-result__cover" src="https://math.jhu.edu/~savitt/GTM/wash.jpg" alt="Cover of Lawrence C. Washington's Introduction to Cyclotomic Fields" width="120" height="191" loading="lazy">
  <div class="gtm-result__text">
    <p>If I were a Springer Graduate Text in Mathematics, I would be Lawrence C. Washington’s <a href="https://math.jhu.edu/~savitt/GTM/wash.html"><strong><em>Introduction to Cyclotomic Fields</em></strong></a>.</p>
    <p>A journey through cyclotomic fields, from class numbers and cyclotomic units to <i>p</i>-adic <i>L</i>-functions, Fermat’s Last Theorem, and Iwasawa theory—with plenty of exercises along the way.</p>
    <p>Which Springer GTM would <em>you</em> be? <a href="https://math.jhu.edu/~savitt/GTM.html">Take the test.</a></p>
  </div>
</div>

### Morse theory on a torus

Compare the negative gradient flows of two height functions, using the induced Euclidean metric. The naive height $h_0=z$ is Morse, but its gradient flow is **not Morse–Smale**: two trajectories connect the upper saddle $p_3$ to the lower saddle $p_2$. Along them, $W^u(p_3)$ and $W^s(p_2)$ share the same tangent line, so their intersection is not transverse.

Tilting the height direction gives $h_\theta=z+\tan(26^\circ)y$, a **Morse–Smale pair** with the same metric. The saddle connections disappear: the unstable branches of $p_3$ go to the minimum, while the stable branches of $p_2$ come from the maximum. Switch between the two models below, compare all four saddle manifolds, or explore one manifold at a time. The tilted model is displayed as a torus rotated by $26^\circ$, so its chosen height is vertical; the explanation below the plot gives the proof.

<iframe id="morse-torus-frame" data-math-visualization src="{{ '/assets/interactive/morse-torus.html' | relative_url }}?v=2" title="Morse and Morse–Smale height flows: upright and tilted torus comparison" loading="lazy" style="display: block; width: 100%; height: 1060px; border: 1px solid #e2e5e8; border-radius: 8px;" allow="fullscreen"></iframe>

[Open the full-size visualization]({{ '/assets/interactive/morse-torus.html' | relative_url }}?v=2) · [Python source]({{ '/scripts/morse_torus/generate.py' | relative_url }})

### A singular foliation by spheres

The level sets of $f(x)=\tfrac12(x_1^2+x_2^2+x_3^2)$ give a simple singular foliation of $\mathbb R^3$: each positive level $c$ is a sphere of radius $\sqrt{2c}$, while the zero level is the single point at the origin. Rotate the picture, vary $c$, and watch the dimension of the selected leaf drop from two to zero. The optional radial arrows show the negative gradient flow, which crosses the spherical leaves.

<iframe id="spherical-foliation-frame" data-math-visualization src="{{ '/assets/interactive/spherical-foliation.html' | relative_url }}" title="Singular foliation of three-dimensional space by concentric spheres and the origin" loading="lazy" style="display: block; width: 100%; height: 850px; border: 1px solid #e2e5e8; border-radius: 8px;" allow="fullscreen"></iframe>

[Open the full-size visualization]({{ '/assets/interactive/spherical-foliation.html' | relative_url }}) · [JavaScript source]({{ '/assets/interactive/spherical-foliation.js' | relative_url }})

### From a disk to a strip

The Riemann mapping theorem becomes quite explicit for the unit disk $\mathbb D$ and the infinite strip $S=\{w\in\mathbb C:|\operatorname{Im}w|<1\}$. Choose an interior point $a\in\mathbb D$ and a target $b\in S$: the picture constructs a **biholomorphic map** $F:\mathbb D\to S$ with $F(a)=b$. Matching colors trace how the disk's grid bends into the strip. Prescribing one point still leaves a rotation parameter; setting $\arg F'(a)=0$ selects the unique map with positive real derivative.

<iframe id="disk-strip-frame" data-math-visualization src="{{ '/assets/interactive/disk-strip.html' | relative_url }}" title="Interactive biholomorphic map from the unit disk to a strip with prescribed source and target points" loading="lazy" style="display: block; width: 100%; height: 950px; border: 1px solid #e2e5e8; border-radius: 8px;"></iframe>

[Open the full-size visualization]({{ '/assets/interactive/disk-strip.html' | relative_url }}) · [JavaScript source]({{ '/assets/interactive/disk-strip.js' | relative_url }})

<script>
(() => {
  document.querySelectorAll('iframe[data-math-visualization]').forEach(frame => {
    let observer;
    function fitVisualization() {
      if (observer) observer.disconnect();
      const main = frame.contentDocument?.querySelector('main');
      if (!main) return;
      const resize = () => { frame.style.height = Math.ceil(main.getBoundingClientRect().height + 2) + 'px'; };
      resize();
      if (window.ResizeObserver) {
        observer = new ResizeObserver(resize);
        observer.observe(main);
      }
    }
    frame.addEventListener('load', fitVisualization);
    fitVisualization();
  });
})();
</script>

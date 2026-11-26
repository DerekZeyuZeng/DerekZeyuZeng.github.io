---
permalink: /
title: "About Me"
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

> 君子性非异也，善假于物也。
>
> —— 荀子《劝学》

Hello! My name is Derek Zeng, and I am an undergraduate student at the University of Illinois at Urbana–Champaign, with a dual degree in Mathematics and Physics. My interests lie in geometry, topology, and mathematical physics—especially the relation between modern homotopy theory and differential geometry. I also did some work on general physics (fluid dynamics, particle physics, gravity) on high school and first year in college.

This site is a place where I share my research, talks and presentations, reading seminars, writings, and projects. I hope these resources can inspire others who are exploring mathematics and physics.

Feel free to explore other sections for more details, and reach out via the contact links in the sidebar.

From Thoughts
----

**[On the Recent Development of AI in Mathematics]({{ '/thoughts/ai-in-mathematics/' | relative_url }})**

对近期数学界中的AI的一点评述 · [中文]({{ '/thoughts/ai-in-mathematics/' | relative_url }}#chinese) · [English]({{ '/thoughts/ai-in-mathematics/' | relative_url }}#english)

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

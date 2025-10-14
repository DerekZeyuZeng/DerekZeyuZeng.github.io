# _pages/cv.md  (or place this file anywhere as cv.md)
---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume/
last_modified_at: 2025-10-13
---

<p><a class="btn btn--primary" href="{{ 'files/CV_Zeyu_Zeng.pdf' | relative_url }}" download>Download PDF</a></p>

<object data="{{ 'files/CV_Zeyu_Zeng.pdf' | relative_url }}" type="application/pdf" width="100%" height="900">
  <p>PDF preview is unavailable. Please
    <a href="{{ 'files/CV_Zeyu_Zeng.pdf' | relative_url }}">download/open the CV</a>.
  </p>
</object>

Education
======
- Undergraduate Student in Mathematics & Physics, University of Illinois Urbana–Champaign, 2024–present

Work experience
======
- N/A

Skills
======
- N/A

Publications
======
{% if site.publications %}
<ul>
  {% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}
</ul>
{% else %}
<p>—</p>
{% endif %}

Talks
======
{% if site.talks %}
<ul>
  {% for post in site.talks reversed %}
    {% include archive-single-talk-cv.html  %}
  {% endfor %}
</ul>
{% else %}
<p>—</p>
{% endif %}

Teaching
======
{% if site.teaching %}
<ul>
  {% for post in site.teaching reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}
</ul>
{% else %}
<p>—</p>
{% endif %}

Service and leadership
======
- N/A

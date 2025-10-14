---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
---

<p><a href="{{ 'files/CV_Zeyu_Zeng.pdf' | relative_url }}" download>Download PDF</a></p>
<object data="{{ 'files/CV_Zeyu_Zeng.pdf' | relative_url }}" type="application/pdf" width="100%" height="900">
  <p>PDF preview unavailable. <a href="{{ 'files/CV_Zeyu_Zeng.pdf' | relative_url }}">Open</a>.</p>
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

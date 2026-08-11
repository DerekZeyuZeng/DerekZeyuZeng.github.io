---
layout: archive
title: "Reading Seminars"
permalink: /seminars/
author_profile: true
---

I occasionally organize informal reading seminars in geometry, topology, and mathematical physics. These seminars are topic-driven rather than scheduled on a fixed weekly basis: a new cycle begins when there is a focused question, suitable reading material, and a small group of interested participants.

Purpose
-------

The seminars are intended to support careful reading and active mathematical discussion. Depending on the topic, a cycle may include participant presentations, worked examples, proof discussions, and a short list of questions for further study.

Typical Format
--------------

- A focused topic or paper is selected before each cycle.
- Participants take turns presenting definitions, examples, and key arguments.
- Each meeting emphasizes one central question and leaves a concrete next step.
- The length, frequency, and prerequisites are announced separately for each cycle.

Upcoming and Ongoing Seminars
-----------------------------

{%- assign visible_seminars = site.seminars | where_exp: "item", "item.published != false" -%}
{%- assign today = site.time | date: "%Y-%m-%d" -%}
{%- assign has_upcoming = false -%}
{% for post in visible_seminars reversed %}
  {%- assign post_start = post.date | date: "%Y-%m-%d" -%}
  {%- assign post_end = post.end_date | default: post_start | date: "%Y-%m-%d" -%}
  {% if post_start >= today or post_start <= today and post_end >= today %}
    {%- assign has_upcoming = true -%}
    {% include archive-single.html %}
  {% endif %}
{% endfor %}
{% if has_upcoming != true %}
No upcoming or ongoing seminars are currently listed.
{% endif %}

Participation
-------------

Students and other interested readers are welcome to get in touch. When contacting me, please include your mathematical background, the topic that interests you, and whether you would be willing to present part of the material. My contact information appears in the sidebar.

**Current Participants:**

- Derek Zeyu Zeng (曾泽昱, Myself), University of Illinois Urbana-Champaign， Organizer
- Siyuan Wei (韦思远), Peking University
- Tony Tunan Zhuang (庄图南),  University of Illinois Urbana-Champaign

Past Seminars and Materials
---------------------------

Future entries will record the topic, dates, references, speakers, and any publicly available notes or slides. Related materials may also appear under [Talks and Presentations](/talks/) or [Personal Notes](/portfolio/).

{%- assign has_past = false -%}
{% for post in visible_seminars reversed %}
  {%- assign post_start = post.date | date: "%Y-%m-%d" -%}
  {%- assign post_end = post.end_date | default: post_start | date: "%Y-%m-%d" -%}
  {% if post_start < today and post_end < today %}
    {%- assign has_past = true -%}
    {% include archive-single.html %}
  {% endif %}
{% endfor %}
{% if has_past != true %}
No completed seminars have been recorded yet.
{% endif %}

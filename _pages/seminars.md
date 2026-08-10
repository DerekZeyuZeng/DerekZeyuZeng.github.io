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

Future and Ongoing Seminars
---------------------------

{%- assign visible_seminars = site.seminars | where_exp: "item", "item.published != false" -%}
{%- assign today = site.time | date: "%Y-%m-%d" -%}
{%- assign has_ongoing = false -%}
{% for post in visible_seminars reversed %}
  {% if post.date >= today and (post.end_date == nil or post.end_date >= today) %}
    {%- assign has_ongoing = true -%}
    {% include archive-single.html %}
  {% endif %}
{% endfor %}
{% if has_ongoing != true %}
There is no seminar currently in progress or scheduled for the future.
{% endif %}

Participation
-------------

Students and other interested readers are welcome to get in touch. When contacting me, please include your mathematical background, the topic that interests you, and whether you would be willing to present part of the material. My contact information appears in the sidebar.

Past Seminars and Materials
---------------------------

Future entries will record the topic, dates, references, speakers, and any publicly available notes or slides. Related materials may also appear under [Talks and Presentations](/talks/) or [Personal Notes](/portfolio/).

{%- assign has_past = false -%}
{% for post in visible_seminars reversed %}
  {% if post.date < today %}
    {%- assign has_past = true -%}
    {% include archive-single.html %}
  {% endif %}
{% endfor %}
{% if has_past != true %}
No completed seminars have been recorded yet.
{% endif %}

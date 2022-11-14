---
title: Writing Sample for PCX
summary: >
  PLACEHOLDER WITTY SUBTITLE
date: 2022-11-04
type: blog
noindex: true
---

Howdy PCX Friends!

[[ PLACHEOLDER: mini-cover-letter-esque intro]]

## Noteworthy Content

As a Product and Program Manager, I've created a lot of business writing, from
product requirements documents to thorough incident reports. However, for the
perspective of a team tasked with building an understanding of our how our
platform can --- and should --- be used, my publicly published blog content is
more applicable. I offer these three posts as a sample of tutorial and system
overview content.

{{< mention "2022-03-11-congressional-district-map" >}}

Specifically under the header, **"Creating the Map Site,"** wherein I explain
how to add Mapbox to a page, then the basic implementaiton of geocoding
locations with touch, search, and geolocation.

---

{{< mention "2021-10-10-rnf-v3" >}}

I write, photograph, and engineer a blog about roadtrips and cars with my
college buddies --- the _content_ of which I would love to discuss in dramatic
detail over a beer. For the purposes of this exercise though, _Route Not Found_
is a system design case study in pairing WordPress, Mapbox interactive mapping,
Google Maps APIs, and AWS PostgreSQL/PostGIS, using Workers, Pages, APO, Stream
and Tunnels to tell a [helluva story](https://www.routenotfound.com/index/).

---

{{< mention "2020-08-12-magic-travel-spreadsheet" >}}

Somewhat relatedly, roadtrip travel planning usually starts with a magic
spreadsheet, which I have "open-sourced," to the extent such a thing is possible
when it is a Google Doc. In this post about it, specifically under the heading
**"How it Works,"** I explain some nifty speadsheet formulas as well as some
basic functionality from Named Ranges and Conditional Formatting.

A possible enhancment: using Workers to build a Google Maps Directions API cache
and proxy for simpler connections, onboarding, and reduced billing.

## Upcoming Drafts & Ideas

- Building an e-Ink Digital Photoframe
  - Long-form, project writeup
  - Go and TypeScript
  - Workers, R2 Storage, Workers KV
- Load H&Co / Typography.com webfont packages faster with Workers
  - Short tutorial example
  - Workers in a Pages Function deployment
  - Cuts of 50-100ms and a redirect (heavily penalized by PageSpeed Insights /
    Lighthouse) when loading H&Co typefaces
- Image Variants in Sass with Hugo
  - Short tutorial example
  - Sass and Hugo
  - Store one image in-repo, serve multiple auto-generated sizes as spec'd within
    a Sass partial. (This is how the masthead photos work on this website.)
  - Could also be done with CF Image Resizing

## Colophon

As of this morning, `tsmith.com` is now
[built with](https://github.com/tsmith512/tsmithcreative) Hugo, the same static
site generator used by Cloudflare's Developer Docs.

[[ PLACEHOLDER: QUICK WRAP UP ]]

<img src="/gfx/logo-dark.svg" alt="" style="display: block; filter: saturate(0) brightness(2.5); margin: 2rem auto;">

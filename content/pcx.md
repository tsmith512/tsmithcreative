---
title: Writing Sample
summary: >
  Technoramblings of a perpetual tinkerer, abridged.
date: 2022-11-14
type: blog
noindex: true
---

## Howdy PCX Friends,

I have been taking things apart since I could hold a screwdriver. Learning how
things work --- then turning around to talk someone's ear off about it has
always been a hobby. I enjoy turning my discoveries into blog posts, conference
presentations, and in-person workshops to teach people new things.

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

I try to keep a few ideas on deck as well.

**Building an e-Ink Digital Photoframe**

- Long-form, project writeup, more like the RNF v3 post
- Go and TypeScript with React
- Workers, R2 Storage, Workers KV

**Load H&Co / Typography.com webfont packages faster with Workers**

- Short tutorial example
- TypeScript or JS
- Workers in a Pages Function deployment
- Cuts of 50-100ms and a redirect (heavily penalized by PageSpeed Insights /
  Lighthouse) when loading H&Co typefaces

**Image Variants in Sass with Hugo**

- Short tutorial example
- CSS and Hugo/Go Templates
- Store one image in-repo, serve multiple auto-generated sizes as spec'd within
  a Sass partial. (This is how the masthead photos work on this website.)
- Could also be done with CF Image Resizing

**Sending an email with Amazon SES from a Cloudflare Worker**

- Short tutorial example
- TypeScript or JS
- Shows how this site's contact form works.
- Could potentially be done with CF Email Relay and Email Workers instead; send
  data to something other than email; and/or be deployed via a Pages Function instead.

## Colophon

As of this morning, `tsmith.com` is now
[built with](https://github.com/tsmith512/tsmithcreative) Hugo, the same static
site generator used by Cloudflare's Developer Docs and (still!) hosted on Pages.

## Thank You

I have spent a lot of time learning from DevDocs since I started using our
products as a customer, and I have enjoyed working closely with many of you
since I joined the company. I believe the pattern of creating thorough,
structured, and organized --- yet easily approachable --- content is a key
differentiator between Cloudflare and our competitors. I am grateful for the
opportunity to submit this sample for your consideration.

<img src="/gfx/logo-dark.svg" alt="TSmith" style="display: block; filter: saturate(0) brightness(2.5); margin: 2rem auto;">

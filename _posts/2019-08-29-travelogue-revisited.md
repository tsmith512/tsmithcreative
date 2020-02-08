---
title: Revisiting the Roadtrip Travel Blog Architecture [Video]
summary: >
  Having recently made significant updates to the blog formerly known as
  Travelogue, I took coworkers on a tour of the architecture and odds-n-ends:
  automated location tracking, geocoding, route planning, map design,
  WordPress tinkering, and a magic spreadsheet.
tags: [development, wordpress, presentation]
---

<iframe src="https://player.vimeo.com/video/353626268" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen><p><a href="https://vimeo.com/353626268">The Internet is for Making Roadtrips (Four Kitchens - Test Kitchen - August 2019)</a> from <a href="https://vimeo.com/tsmith512">Taylor Smith</a> on <a href="https://vimeo.com">Vimeo</a>.</p></iframe>

I wrote about
[this blog and its underlying technology]({% post_url 2017-04-23-building-travelogue %})
before. In late 2018, I completed a hurried MVP migration to WordPress.
Since then, I continued making a steady stream of updates and building
additional trinkets for our next adventure: driving from Austin to Anchorage.

During a 4K Test Kitchen session, I took my colleagues on a tour of the system
and what I built to keep telling the story.

{% picture mini /blog/travelogue-revisited/new-architecture.png --alt Revised Architecture --img class="noshadow" %}

The system still relies on the same original components. The primary change
since its original launch is a migration from Tumblr to WordPress. Since that
relaunch in 2018, I've made improvements to frontend performance, map design,
better location service integration, and the ability to submit content via
email. Also two new gadgets:

- Magic roadtrip planning spreadsheet
- A Slack API and Symfony powered Craigslist ad scraper to archive listings

{% picture /blog/travelogue-revisited/seward.jpg --alt We made it. Again. %}

_We made it. Again._

---
title: Revisiting the Roadtrip Travel Blog Architecture [Video]
summary: >
  Having recently made significant updates to the blog formerly known as
  Travelogue, I took coworkers on a tour of the architecture and odds-n-ends:
  automated location tracking, geocoding, route planning, map design,
  WordPress tinkering, and a magic spreadsheet.
tags: [engineering, side projects, travel, presentation]
format: video
embed: >
  <div style="position: relative; padding-top: 56.25%;">
    <iframe
      src="https://customer-igynxd2rwhmuoxw8.cloudflarestream.com/f382032c94b23fbc6c6ed50db2be9239/iframe?poster=https%3A%2F%2Fcustomer-igynxd2rwhmuoxw8.cloudflarestream.com%2Ff382032c94b23fbc6c6ed50db2be9239%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
      loading="lazy"
      style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;"
      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
      allowfullscreen="true"
    ></iframe>
  </div>
---

<div style="position: relative; padding-top: 56.25%;">
  <iframe
    src="https://customer-igynxd2rwhmuoxw8.cloudflarestream.com/f382032c94b23fbc6c6ed50db2be9239/iframe?poster=https%3A%2F%2Fcustomer-igynxd2rwhmuoxw8.cloudflarestream.com%2Ff382032c94b23fbc6c6ed50db2be9239%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
    loading="lazy"
    style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;"
    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
    allowfullscreen="true"
  ></iframe>
</div>

I wrote about
[this blog and its underlying technology]({{< ref "2017-04-23-building-travelogue" >}})
before. In late 2018, I completed a hurried MVP migration to WordPress.
Since then, I continued making a steady stream of updates and building
additional trinkets for our next adventure: driving from Austin to Anchorage.

During a 4K Test Kitchen session, I took my colleagues on a tour of the system
and what I built to keep telling the story.

{{< media type="image" size="mini" src="new-architecture.png" alt="Revised Architecture" noshadow="noshadow" >}}

The system still relies on the same original components. The primary change
since its original launch is a migration from Tumblr to WordPress. Since that
relaunch in 2018, I've made improvements to frontend performance, map design,
better location service integration, and the ability to submit content via
email. Also two new gadgets:

- Magic roadtrip planning spreadsheet
- A Slack API and Symfony powered Craigslist ad scraper to archive listings

{{< media type="image" size="" src="seward.jpg" alt="We made it. Again."  >}}

_We made it. Again._

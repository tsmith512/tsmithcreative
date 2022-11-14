---
title: "Tulsa 2013 Convention Website"
summary: "A Website for the American Advertising Federation 10th District 2013 Spring Convention in Tulsa."
date: 2012-05-10 00:00:00
tags: [volunteer, drupal, frontend, events, maps]
images:
  - img: t2013a.png
    alt: 
    title: 
    width: 1230
    height: 935
  - img: t2013b.png
    alt: 
    title: 
    width: 1230
    height: 1149
  - img: t2013c.png
    alt: 
    title: 
    width: 1230
    height: 1255
  - img: t2013d.png
    alt: 
    title: 
    width: 1230
    height: 1136

---

AAF Tulsa needed website for the 2013 Convention with three primary purposes:

1.  To show both the growth of the convention as it was planned,
2.  To be used as a resource on-site (mobile-friendly) during the convention, and
3.  To generate interest in and sell registrations to potential guests.

Speakers, planning committee members, advisory council members, and sponsors are all profiled. A calendar is made available. Convention news is also posted so potential guests can stay apprised. UberCart fuels the registration process, building orders and handing them off to PayPal for secure checkout.

The most exciting feature of this site has yet to be deployed: my first Drupal module, Node Mosaic. The convention theme centers around the Pioneers, Outlaws, and Storytellers of Advertising. Node Mosaic prompts users to share their own advertising stories by posting a 'tile' with a story on a scrolling, draggable mosaic of tiles. As visitors drag the tile canvas, tiles are populated via AJAX in one of three states: "post here", "claimed", or using the tile image with a link to the node display. Because tiles have their own unique coordinates, visitors are able to "steak claim" to a tile nearby someone else, or go off on their own to start another region. Think of it as an Internet Land Rush. But jump on over to the site for a better explanation.

Because of the load that the node mosaic places on a server, the site is hosted on its own dedicated virtual server (with Linode) donated and managed by TSmithCreative. Varnish cache accelerates page loading by caching the Node Mosaic responses in addition to Node Mosaic's own caching structure.

---

*   **Development Platform:** Drupal 7
*   **Notable Modules:** UberCart, Date, Calendar, Panels, Views, Workflow
*   **Custom Theme, Responsive for Mobile**
*   Concept and Graphic Design by [Jeff Savage](http://www.studiosavage.com/) and [Libby Bender](http://www.libbyandcompany.com/).
*   Visit [Tulsa 2013](http://www.tulsa2013.com).

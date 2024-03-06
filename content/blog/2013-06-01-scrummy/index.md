---
title: "Scrummy"
summary: "A real-time multiplayer Scrum estimation game."
date: 2013-06-01 14:37:23
tags: [javascript, scrum, product ownership, frontend, design]
images:
  - img: sc-1.jpg
    alt:
    title:
    width: 1080
    height: 640
  - img: sc-2.jpg
    alt:
    title:
    width: 1080
    height: 640
  - img: sc-3.jpg
    alt:
    title:
    width: 1080
    height: 640
format: portfolio
---

[Four Kitchens](http://www.fourkitchens.com) follows Scrum project management methodology. One of our project managers wrote a great [4K Scrum Guide](https://github.com/fourkitchens/4K-scrum-guide), if you aren't familiar. To summarize this game's position within the process: during a project, each development story is "estimated" for its complexity with a simple card game. Our team moves around a lot, so we wanted a way to loop in remote players. Agile coach Luis Goncalves has a very thorough explanation of [planning poker on his blog](https://luis-goncalves.com/planning-poker-scrum-poker/).

{{< gallery >}}

Scrummy was my first exposure to [Node.js](http://nodejs.org/). It leverages [Express](http://expressjs.com/) to serve static assets and [Socket.io](http://socket.io/) to handle multiplayer communication. When I have some time to dedicate to Version 2, I want to rebuild the frontend using an MVC controller so that the game doesn't rely on DOM manipulation (which feels really dirty) and can be more efficient with exchanging data (instead of sending strings so frequently).

{{< credits >}}
* **Designed and developed as part of 20% time at [Four Kitchens](http://www.fourkitchens.com).**
* **Development Platform:** Node.js with Express and Socket.io
* **Typefaces** Fjalla One, Stint Ultra Expanded, Open Sans provided by Google Webfonts
* Play Scrummy at [playscrummy.com](http://playscrummy.com)
* [Learn more on GitHub](http://tsmith512.github.io/scrummy/)
{{< / credits >}}

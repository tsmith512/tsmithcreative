---
title: "Intro to Stream and Accepting UGC: Building VidBin"
summary: >
  Overview of Cloudflare Stream and walkthrough of building an app on Pages
  and Workers to accept user generated content (UGC) easily. Let's build a
  "PasteBin but for video" together, without needing any video expertise!
tags: [presentation, video]
citation: ["THAT24", "https://thatconference.com/activities/3mAv9hu2Z98Ht4Bd5GkB"]
---

Cloudflare sponsored [THAT Conference Texas 2024](https://thatconference.com/tx/2024/)
which gave me an opportunity to talk about Stream. As I was working with the event
team to figure out how we might demo the product, we thought about a potential
proof of concept app. I settled on making a "[PasteBin](https://pastebin.com/)"
but for video.

{{< media size="small" type="image" src="how-might-that-work.jpg" alt="Pieces of VidBin" >}}

In this presetation, I walk through Stream at a high level, then break down
VidBin into six "steps" to show common use-cases, questions, and patterns we see
as folks start building video into their app.

The app (frontend and server components both) are built with Cloudflare Pages's
new support for [Next.js](https://nextjs.org/) called [Next on Pages](https://github.com/cloudflare/next-on-pages).

Check out [VidBin](https://tsmith.vidbin.com) to take it for a spin or see how
it's built at [github.com/tsmith512/vidbin](https://github.com/tsmith512/vidbin).

## Slides

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRv2jxTiINfpuFdauYysrhEXDrzk8O5FpgwerMsUJYrCnknF3Bkjs-lhLuUuD9U4QT6fr6RhNVzfoYa/embed?start=false&loop=false" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

_[Stream UGC 101: Building VidBin](https://docs.google.com/presentation/d/16Ovfopm7HLB48DVlmfXor4Pkctdv9ulkq9k44DrsfYE/edit?usp=sharing)_ on Google Slides

## Recording

<div style="position: relative; padding-top: 56.25%;">
  <iframe
    src="https://customer-igynxd2rwhmuoxw8.cloudflarestream.com/9f9e3b02b91f135e26e6d3412ae52fe8/iframe?preload=true&poster=https%3A%2F%2Fcustomer-igynxd2rwhmuoxw8.cloudflarestream.com%2F9f9e3b02b91f135e26e6d3412ae52fe8%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D9m45s%26height%3D600&startTime=1m28s"
    style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;"
    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
    allowfullscreen="true"
  ></iframe>
</div>

My first stab at a new talk. Will re-record with a lot more sleep, much less
coffee, and some refinements based on the experience today!

## Acknowledgements

VidBin was heavily influenced by an internal demo called "Paste.Video" built by
two colleagues, [Ryan Schachte](https://ryan-schachte.com/) and Scott Miller,
with beta testing and frontend advice from [Kevin Kipp](https://kevinkipp.com/).
Apal Shah's post [WebRTC — Switch Cameras using Javascript getUserMedia](https://www.gosink.in/webrtc-switch-cameras-using-javascript-getusermedia/)
was super helpful when I was trying to figure out how to build the flip camera
button.

Thanks also to THAT Conference; [Evan Griffith](https://www.evangriffithbooks.com/)
for photos, moral support, and beta testing; and to our Cloudflare group at the
conference (Dawn, Sabrina, Peter, Nathan, Kristian, and Emilio) for a great
couple days with lots of good conversations. And in spirit, thanks to my old
friends in green at [Four Kitchens](https://www.fourkitchens.com/) who got me
speaking a lot back in the day. Today was my first talk since
[DrupalCon 2019]({{< ref "2019-04-18-dc-seattle">}}) --- and although I am on
team orange now, I was a Web Chef when I learned I like hosting talks.

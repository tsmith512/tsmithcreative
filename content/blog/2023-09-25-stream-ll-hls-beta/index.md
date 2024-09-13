---
title: Low-Latency HTTP Live Streaming (LL-HLS) Beta on Cloudflare Stream
summary: >
  Cloudflare Stream’s LL-HLS support enters open beta today. You can deliver
  video to your audience faster, reducing the latency a viewer may experience on
  their player to as little as 3 seconds.
tags: [product management, video]
citation: [CF, "https://blog.cloudflare.com/cloudflare-stream-low-latency-hls-open-beta/"]
---

Stream Live lets users easily scale their live-streaming apps and websites to
millions of creators and concurrent viewers while focusing on the content rather
than the infrastructure — Stream manages codecs, protocols, and bit rate
automatically.

For Speed Week this year, we introduced a
[closed beta of Low-Latency HTTP Live Streaming (LL-HLS)](https://blog.cloudflare.com/low-latency-hls-support-for-cloudflare-stream/),
which builds upon the high-quality, feature-rich HTTP Live Streaming (HLS)
protocol. Lower latency brings creators even closer to their viewers, empowering
customers to build more interactive features like chat and enabling the use of
live-streaming in more time-sensitive applications like live e-learning, sports,
gaming, and events.

Today, in celebration of Birthday Week, we’re opening this beta to all customers
with even lower latency. With LL-HLS, you can deliver video to your audience
faster, reducing the latency a viewer may experience on their player to as
little as three seconds. Low Latency streaming is priced the same way, too: $1
per 1,000 minutes delivered, with zero extra charges for encoding or bandwidth.

## Broadcast with latency as low as three seconds.

LL-HLS is an extension of the [HLS standard](https://www.cloudflare.com/learning/video/what-is-http-live-streaming/)
that allows us to reduce glass-to-glass latency — the time between something
happening on the broadcast end and a user seeing it on their screen. That
includes factors like network conditions and transcoding for HLS and adaptive
bitrates. We also include client-side buffering in our understanding of latency
because we know the experience is driven by what a user sees, not when a byte is
delivered into a buffer. Depending on encoder and player settings, broadcasters'
content can be playing on viewers' screens in less than three seconds.

<div style="position: relative; padding-top: 56.25%;">
  <iframe
    src="https://customer-igynxd2rwhmuoxw8.cloudflarestream.com/93e451e5604062c9989f393a9ab4e01d/iframe?muted=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-igynxd2rwhmuoxw8.cloudflarestream.com%2F93e451e5604062c9989f393a9ab4e01d%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
    style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;"
    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
    allowfullscreen="true"
  ></iframe>
</div>

On the left, OBS Studio broadcasting from my personal computer to Cloudflare
Stream. On the right, watching this livestream using our own built-in player
playing LL-HLS with three second latency!


### Same pricing, lower latency. Encoding is always free.

Our addition of LL-HLS support builds on all the best parts of Stream including
simple, predictable pricing. You never have to pay for ingress (broadcasting to
us), compute (encoding), or egress. This allows you to stream with peace of
mind, knowing there are no surprise fees and no need to trade quality for cost.
Regardless of bitrate or resolution, Stream costs $1 per 1,000 minutes of video
delivered and $5 per 1,000 minutes of video stored, billed monthly.

Stream also provides both a built-in web player or HLS/DASH manifests to use in
a compatible player of your choosing. This enables you or your users to go live
using the same protocols and tools that broadcasters big and small use to go
live to YouTube or Twitch, but gives you full control over access and
presentation of live streams. We also provide access control with signed URLs
and hotlinking prevention measures to protect your content.

### Powered by the strength of the network

And of course, Stream is powered by Cloudflare's global network for fast
delivery worldwide, with points of presence within 50ms of 95% of the Internet
connected population, a key factor in our quest to slash latency. We ingest live
video close to broadcasters and move it rapidly through Cloudflare’s network. We
run encoders on-demand and generate player manifests as close to viewers as
possible.

## Getting started with LL-HLS

Getting started with Stream Live only takes a few minutes, and by using Live
Outputs for restreaming, you can even test it without changing your existing
infrastructure. First, create or update a Live Input in the Cloudflare
dashboard. While in beta, Live Inputs will have an option to enable LL-HLS
called “Low-Latency HLS Support.” Activate this toggle to enable the new
pipeline.

{{< media size="small" type="frame" src="dash.png" alt="Cloudflare Dash" >}}

Stream will automatically provide the RTMPS and SRT endpoints to broadcast your
feed to us, just as before. For the best results, we recommend the following
broadcast settings:

- Codec: h264
- GOP size / keyframe interval: 1 second

Optionally, configure a Live Output to point to your existing video ingest
endpoint via RTMPS or SRT to test Stream while rebroadcasting to an existing
workflow or infrastructure.

Stream will automatically provide RTMPS and SRT endpoints to broadcast your feed
to us as well as an HTML embed for our built-in player.

{{< media size="small" type="image" src="dash2.png" alt="Cloudflare Dash" >}}

This connection information can be added easily to a broadcast application like
OBS to start streaming immediately:

{{< media size="small" type="image" src="obs.png" alt="OBS" >}}

During the beta, our built-in player will automatically attempt to use
low-latency for any enabled Live Input, falling back to regular HLS otherwise.
If LL-HLS is being used, you’ll see “Low Latency” noted in the player.

During this phase of the beta, we are most closely focused on using
[OBS](https://obsproject.com/) to broadcast and Stream’s built-in player to
watch. However, you may test the LL-HLS manifest in a player of your own by
appending ?protocol=llhls to the end of the HLS manifest URL. This flag may
change in the future and is not yet ready for production usage;
[watch for changes in DevDocs](https://developers.cloudflare.com/stream/changelog/).

## Sign up today

Low-Latency HLS is Stream Live’s latest tool to bring your creators and
audiences together. All new and existing Stream subscriptions are eligible for
the LL-HLS open beta today, with no pricing changes or contract requirements ---
all part of building the fastest, simplest serverless live-streaming platform.
Join our beta to start test-driving Low-Latency HLS!

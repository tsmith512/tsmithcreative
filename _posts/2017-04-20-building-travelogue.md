---
title: Location-tracking Roadtrip Blog
summary: >
  Combining automatic location tracking, geocoding, route planning, map design,
  and a custom theme frontend on a Tumblr blog to bring friends and family along
  on the ride of a lifetime. Twice.
tags: [development, aws, design, writing, photography]
---

_From the Travelogue:_

> A while back, two friends from Tulsa, introduced me to a little BBC television
> program called Top Gear. Periodically, these three glorious Brits would be
> sent by "the Producers" _(prah-DEU-suhz)_ on special adventures: buy used cars
> sight-unseen over the Internet for a pittance, then drive them over a long
> distance (meandering routes preferred) while being hilariously abusive to each
> other and competing to see who made the best purchase (by no measure in
> particular). I do not recall the quantity of grownup drinks required to
> believe recreating this enterprise would be wise, but, sufficiently imbibed,
> an idea emerged!

I was almost surprised by the enthusiasm generated among my friends and family
at our upcoming lunacy. Everyone wanted to know how I'd be sharing our
adventures. For that trip, back in 2015, I had a Tumblr blog and would post
screenshots of static maps as we went along.

But we've been planning a second trip for the past six months, which has given
me time to up my blogging game.

## The Sum of its Parts

![Diagram of the Applications][DIAGRAM]

This is perhaps a more complex amalgamation of services than it could have been,
but I've tried to separate concerns as much as possible.

### [Location Tracker Backend][TRACKER]

In 2015, I tracked our trip with a [terrible pile of PHP scripts\*][ORIGINAL]
created in great haste before we left. After the trip, I left the service
running and continued to improve it. Over time, I've built it into a [Silex][SILEX]
application with MySQL for data storage and a [set of API endpoints][API] which
exposes location history data and [GeoJSON][GJ].

![Location Tracker admin view][TRACKERUI]

**Location Tracker's job:** Record location updates from my phone (submitted
every 30 minutes) and provide these data for the frontend to display our
progress in real-time.

_\* Yes, all keys and credentials in this commit have since been invalidated._

### [Google Maps Geocoder API][GGCD]

The Backend app uses Google Maps's API to "geocode" the longitude and latitude
coordinates in the updates into useful data like city, state, street address,
and more. Currently, I'm only using the city names, but the application stores
the entire response serialized in the database in case I want to use more of it
in future updates.

An example of a geocoded response as provided by the
[`GeocoderServiceProver`][GSP] for Silex:

```
Array
(
    [latitude] => 36.15685900
    [longitude] => -95.99151600
    [bounds] => Array
        (
            [south] => 36.15685900
            [west] => -95.99151600
            [north] => 36.15685900
            [east] => -95.99151600
        )

    [streetNumber] => 1
    [streetName] => South Boston Avenue
    [cityDistrict] => 
    [city] => Tulsa
    [zipcode] => 74103
    [county] => Tulsa County
    [countyCode] => TULSA COUNTY
    [region] => Oklahoma
    [regionCode] => OK
    [country] => United States
    [countryCode] => US
    [timezone] => 
)
```

The data is mostly for my own use in the location tracker, but it is used in one
place on the blog:

![Where Are They Now?][WHERE]

**Google Geocoder's job:** Provide the city names used in the frontend for
"Where are they now?".

### [Amazon Web Services][AWS]

So this location tracker has sensitive information: precisely where I've been
every half hour over the past two years, accurate to within about 20 feet.

![Like, really precise][RMNP]

_(That's "What trail are you on?" precision.)_

Also, I'd rather not have the real endpoint exposed to the public since the
application's authentication is _currently_ quite simple and the server it runs
on isn't very powerful.

[AWS API Gateway][AAG] exposes a CORS-capable endpoint and accepts `GET`
requests which are passed to a [Lambda function][AL] I wrote to
[fetch data from the backend application and anonymize it][LAMBDA].

- Only the endpoints used by the blog are whitelisted
- Only `GET` and `OPTIONS` (for CORS) requests are permitted
- If a response contains coordinate pairs in Austin or Tulsa, they are rewritten
  to be at the [State Capitol][TXC] or the [Center of the Universe][COTU].

Also, API Gateway can cache responses to reduce the load on my server while
we're actually traveling and site traffic will be marginally higher. This kicks
me out of AWS's Free Usage Tier, but I won't be in a position to fix anything on
the road, so I say it's worth it.

![API Gateway Config][AAGLT]

Finally, [S3][S3] is used to store all the static assets (images, fonts, style,
and scripts) for the frontend theme.

![S3 Storage Bucket Contents][S3LT]

**AWS's jobs:** Make sure the crazies can't figure out where I sleep. Prevent
overloading my backend application server. Serve static assets via an
HTTPS-capable CDN.

!! @TODO: You aren't using an HTTPS-capable CDN yet. !!

### [Google My Maps][GMM]

Google's Drive service offers a suite of applications from word processing to
spreadsheeting. A little known application in that suite is "My Maps," which
allows users to add routes, points, geometric shapes, and other geographical
data to maps and export it as KML. I use this to collect our route plans,
accommodations, and points of interest we intend to visit.

![The "My Maps" map for the roadtrip][TQORGMM]

**My Maps's job:** Let me collect the route and POI data to be added to the map
and export it to a standard format.

### [Mapbox][MB]

Mapbox allows [rich map design options][MBS] and their free tier is more than
enough to support my small audience. Using Mapbox, I compile the customized base
map as a "Style" which also includes overlays of our route and accommodations I
imported from "My Maps" as _custom datasets._ This way, all those layers are
loaded as a single map.

![The Mapbox composit in the editor][TQMB]

**Mapbox's job:** Design and provide the visual map for the frontend with
route/POI data already imported.

### My Phone

My trusty Google Pixel, a generous Christmas gift from [Four Kitchens][4K], is
ultimately the source of all of these data. A [custom task][TASKERTASK] for
[Tasker][TASKER] records my location every half hour, batches it for submission,
and submits the batch when a connection is available.

I also use the [Tumblr Android app][TAPP] to write the shorter posts and upload
single images and videos.

**My phone's job:** Passively record and submit location data, post content.

### [Tumblr][TUMBLR]

At its heart, the frontend is just a Tumblr blog. I picked Tumblr because it has
a good mobile editing experience, an even better desktop editing experience,
handles photos and video gracefully, and supports fully customized themes.

![Tumblr Dashboard][TDASH]

[The frontend][TTHEME] loads the Mapbox map, pulls the route and current
location data from the AWS API proxy, and displays in the custom theme a
chronological listing of all posts I've made: longform text posts, individual
photos with captions, photosets (galleries with a lightbox), quotes (because the
funniest part of all this is the banter), and the occasional video (because some
things have to be seen to be believed). Each post has a "Show on Map" link which
re-centers the map view to where we were when I made the post.

![The Frontend][SITE]

_(Spacing slimmed down to show more features.)_

**Tumblr's job:** Tie all the pieces together into the frontend experience.

## Ready to Roll

We're about three weeks out from the trip. I'm excited to have this almost
finished up, though I see lots of room for improvements if I find the free time.
I love projects that tie multiple interests together, and I especially
appreciate the opportunity to help people use the web to tell their stories.
This project has hit all of those spots.

All that's left is to buy an offroader off Craigslist, drive it a thousand miles
through the desert, and sell it off in Salt Lake. How hard can it be?


[DIAGRAM]: /assets/blog/building-travelogue/diagram.png
[TRACKER]: https://github.com/tsmith512/location-tracker
[TRACKERUI]: /assets/blog/building-travelogue/location-history.png
[ORIGINAL]: https://github.com/tsmith512/location-tracker/commit/26fbff80d704be926d8fe999809f439ccb163708
[SILEX]: https://silex.sensiolabs.org/
[API]: http://docs.locationtrackerapi.apiary.io/
[GJ]: http://geojson.org/
[GGCD]: https://developers.google.com/maps/documentation/geocoding/intro
[GSP]: https://github.com/geocoder-php/GeocoderServiceProvider
[WHERE]: /assets/blog/building-travelogue/where-are-they-now.png
[AWS]: https://aws.amazon.com/
[RMNP]: /assets/blog/building-travelogue/very-precise.png
[AAG]: https://aws.amazon.com/api-gateway/
[AL]: https://aws.amazon.com/lambda/
[LAMBDA]: https://github.com/tsmith512/travelogue-tumblr/blob/master/aws/index.js
[TXC]: https://en.wikipedia.org/wiki/Texas_State_Capitol
[COTU]: http://www.atlasobscura.com/places/the-center-of-the-universe
[AAGLT]: /assets/blog/building-travelogue/aws-api-gateway.png
[S3]: https://aws.amazon.com/s3/
[S3LT]: /assets/blog/building-travelogue/travelogue-s3.png
[GMM]: https://www.google.com/maps/about/mymaps/
[TQORGMM]: /assets/blog/building-travelogue/my-my-maps-map.png
[MB]: https://www.mapbox.com/
[MBS]: https://www.mapbox.com/mapbox-studio/
[TQMB]: /assets/blog/building-travelogue/mapbox-map.png
[TUMBLR]: https://www.tumblr.com/about
[TDASH]: /assets/blog/building-travelogue/tumblr-dash.png
[TTHEME]: https://github.com/tsmith512/travelogue-tumblr
[SITE]: /assets/blog/building-travelogue/final.png
[4K]: https://www.fourkitchens.com/
[TASKERTASK]: https://github.com/tsmith512/location-tracker/blob/master/tasker/task.xml
[TASKER]: http://tasker.dinglisch.net/
[TAPP]: https://play.google.com/store/apps/details?id=com.tumblr&hl=en

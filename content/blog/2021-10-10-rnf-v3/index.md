---
title: Route Not Found on the Edge
summary: >
  In which the roadtrip travel blog gets yet another round of pre-trip
  wrenching: new delivery infrastructure, a total rewrite of the location and
  mapping stack, and a handful of WordPress tweaks.
tags: [engineering, side projects, travel]
galleries:
  finishes:
    - src: olympic-national-park.jpg
      alt: Finish line in Washington
      caption: Hurricane Ridge, Olympic National Park, Port Angeles, WA
      from: 2017-04-23-building-travelogue
    - src: grand-canyon.jpg
      alt: Lined up on the North Rim of the Grand Canyon
      caption: Grand Canyon Parashant National Monument, AZ
      from: 2017-04-23-building-travelogue
    - src: seward.jpg
      alt: Finish line in Seward
      caption: Seward, AK
      from: 2019-08-29-travelogue-revisited

---

_Previously on "The Internet is for Doing Roadtrips!"_

{{< gallery finishes >}}

In 2019, I [gave a tour of how]({{< ref "2019-08-29-travelogue-revisited" >}})
our location-tracking media-heavy roadtrip blog worked.

I stood it up on Tumblr in 2015 for the [Pacific Coast Highway][PCH] "cheap car
challenge" roadtrip. You know, back when I mistakenly assumed that would be the
_only_ one. In 2017, for the [Southwest Offroadtrip][TQOR], I added all the
mapping bits. After that, little changed except a migration to WordPress. Then
before running a beater convertible up the [ALCAN][ALCAN] in 2019, I did some
feature-stuffing but side-stepped something important: the whole mess was
_horrifically insecure._ And the code had become rather embarrassing.

Still, I've become increasingly proud of this little platform as it has grown. I
recently compiled an
<a href="https://www.routenotfound.com/index/?utm_source=tsmithcreative&utm_medium=website&utm_campaign=tsmithcreative" rel="nofollow">
index of our escapades</a> and it was longer than I'd realized.

{{< media type="image" size="mini" src="rnfb-post.jpg" alt="Post on the frontend" noshadow="noshadow" >}}

## Old Architecture [v2 from 2017]({{< ref "2017-04-23-building-travelogue" >}})

A refresher of this clutter:

{{< media type="image" size="mini" src="new-architecture.png" alt="Version 2 Architecture" noshadow="noshadow" from="2019-08-29-travelogue-revisited" >}}

- The location service was _entirely_ unauthenticated.
- It was built on [Silex][SILEX], a [Symfony][SYMF] 3 off-shoot _well_ beyond EOL.
- It needed a separate proxy for things like "don't tell the Internet where I
  sleep" and "don't follow me when we're not traveling."

Also:

- It ran on a separate server instance (💸💸).
- The PHP I wrote for the backend wasn't fantastic. The JavaScript for the
  proxy script and the blog frontend was sloppy 2015-era JS --- a time we all
  yearned to dump heavy libraries but that meant writing everything the hard way.
- The blog used an obsolete Mapbox library.

{{< media type="image" size="" src="truck-clutch-op-cyl.jpg" alt="Reseating a clutch fluid line"  >}}

And that site has always been my playground to fiddle with interesting tech
and learn new things. As I ramp up as a new Product Manager at Cloudflare,
just how much can I orange-cloud\* Route Not Found? It's professional
development, _I promise._

_\* CF-speak for "adding a site on our infrastructure," the term originating from a cute piece of UI in the Dashboard._

## Architecture v3

_In which "Zero Trust" describes both the security products in play and the prudent measure of faith to place in a hooptie._

{{< media type="image" size="" src="v3-arch.png" alt="Version 3 Architecture" noshadow="noshadow" >}}

What happens **on my phone** is the same: [Tasker][TASKER]
pulls a location every half-hour and sends it to the service, batching it for
later if we're out from under The Cloud. I also submit photos and posts with the
WordPress app.

{{< media type="image" size="" src="celica-coolant.jpg" alt="Reseating a radiator hose"  >}}

The **Location Service Worker** is the _key new piece,_ running on the
[Workers][WORKERS] serverless platform on the Cloudflare Edge:

- Receives GPS history from my phone
- Gets information about those waypoints using [Google Maps Geocoding API][GMAPS]
- Writes/reads these data to the database on _Alfa,_ connected via a [Tunnels][TUNNEL] backhaul
- Does additional filtering on location history
- Aggregates some interesting stats
- Requires authentication for operations that read anything unfiltered _or_
  write anything at all
- It's also my first stab at writing a project in [TypeScript][TS], which I quite like!
- 📝 _Worker [API specification][RNFAPI] and [codebase][RNFLSW]_

{{< media type="image" size="" src="rnfa-maps.jpg" alt="Admin backend showing all trips" noshadow="noshadow" >}}

I split the **Location Service Frontend** to a separate [React][REACT] app
on [Pages][PAGES], also Edge-hosted, and secured by ~~a giant No Trespassing sign~~
_[Access][ACCESS]_:

- Shows data from the Worker with visuals using Google Maps
- Facilitates creating and updating Trip info
- Facilitates fixing geocoder problems
- It's also my first stab doing anything substantial with React.  Not confident
  with it yet, but it's quick and fun.
- 📝 _Admin SPA [codebase][RNFLAP]_

{{< media type="image" size="" src="rnfa-trips.jpg" alt="Admin backend showing a trip edit" noshadow="noshadow" >}}

The only remaining server is named **Alfa,** a [Lightsail][LIGHTSAIL] instance
in AWS, protected by Cloudflare's firewall and propped up by the CDN. Alfa runs
both WordPress and the location database. For that, I picked [PostgreSQL][PSQL]
for two extensions:

- **[PostGIS][PGIS]** adds geographic and geometric types, functions,
  and aggregators. Rather than writing code myself in the Worker to do
  geographic math or assemble GeoJSON, Postgres can do it for me, faster,
  eliminating round-trips to the database.
- **[PostgREST][PRST]** is a middleware service that exposes a PostgreSQL
  instance via an authenticated HTTP API. Workers can't open raw TCP
  connections (yet!), but they can [`fetch`][FETCH]. A colleague
  [recently wrote a post about this][CFBLOG], which helped me get started.

Also, I restructured the database to expose location history in a `VIEW` which
joins Waypoints to Trips `BETWEEN` start and end times. Thus, it only contains
Waypoints during Trips.

{{< media type="image" size="" src="nye2020.jpg" alt="New Year's Eve 2020, New Mexico"  >}}

The rest of the stack remains:

- Simple WordPress blog:
  - Deployed by [Composer][COMPOSER]
  - With a few [small plugins I wrote][RNFWP] for performance tuning and
    integration with the Location Service and Mapbox.
  - **New:** I moved what few videos I have over to [Stream][STREAM], locked
    the staging environment behind Access, turned on bot blocking, and activated
    [APO][APO] --- _beyond_ overkill for the size of my audience but surprisingly
    fast.
  - **Future?** With Tunnels, I could garage the blog onto an old computer in my
    apartment when we're not on the road (i.e. when even fewer people read it),
    which would make it free...
- Frontend maps with [Mapbox GL JS][MAPBOX] and designed in [Mapbox Studio][MAPSTUDIO].
- I can write short posts via email sent from our emergency satellite beacon.
- And we're still using my
  [Magic Roadtrip Planning Spreadsheet]({{< ref "2020-08-12-magic-travel-spreadsheet" >}}),
  [Google My Maps][MYMAPS], and [Caltopo][CALTOPO] for scheming.

{{< media type="image" size="" src="cassiar-hwy.jpg" alt="Cassiar Highway near Dease Lake, BC"  >}}

## So it's that time again?

Yup. This project only gets love when we're fixin' to set off on an adventure.
Thanks to these _continued_ "unprecedented times," the used car market is facing
significant inflation. Who knew that if I'd held onto that little Celica a while
longer, I could have turned a profit on it?! So we've tabled whatever Great
Roadtrip #4 will be for a while.

{{< media type="image" size="" src="nutter-twists.jpg" alt="Nutter Twists Road, Mr Trumbull, AZ"  >}}

Instead, we're going to do a Greatest Hits from the Southwest Offroadtrip this
October with our usual loadout: Xterra the Younger and his friends, George's
Jeep Renegade and Evan's Land Rover Discovery. The latter returning to its
proving grounds, as it was purchased originally for that trip and seen here with
the 4Runner I still miss.

<p><em><a href="https://www.routenotfound.com/category/tq_sw_hits/?utm_source=tsmithcreative&utm_medium=website&utm_campaign=blog" rel="nofollow">The Southwest Backtrack</a></em></p>

{{< media type="image" size="" src="salmon-glacier.jpg" alt="Salmon Glacier near Hyder, AK"  >}}

---

_Disclaimer: I am a Cloudflare employee and built this as a way to kick some tires on our product line, some of which is made available to me for free --- although the Free Plan would cover everything but my use of Stream and APO. This is not an endorsement of our wacky hobbies, nor is it product documentation or security guidance._

[PCH]: https://tsmithphotos.com/the-pacific-coast-highway?utm_source=tsmithcreative&utm_medium=website&utm_campaign=blog
[TQOR]: https://tsmithphotos.com/overland-in-the-southwest?utm_source=tsmithcreative&utm_medium=website&utm_campaign=blog
[ALCAN]: https://tsmithphotos.com/austin-to-alaska?utm_source=tsmithcreative&utm_medium=website&utm_campaign=blog
[RNFINDEX]: https://www.routenotfound.com/index/?utm_source=tsmithcreative&utm_medium=website&utm_campaign=blog
[SILEX]: https://github.com/silexphp/Silex
[SYMF]: https://symfony.com/
[TASKER]: https://tasker.joaoapps.com/
[WORKERS]: https://workers.cloudflare.com/
[GMAPS]: https://developers.google.com/maps/documentation/geocoding/overview?hl=en
[TUNNEL]: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/create-tunnel
[TS]: https://www.typescriptlang.org/
[RNFAPI]: https://rnflocationserviceapiv2.docs.apiary.io/
[RNFLSW]: https://github.com/tsmith512/rnf-location-service
[REACT]: https://reactjs.org/
[PAGES]: https://pages.cloudflare.com/
[ACCESS]: https://developers.cloudflare.com/cloudflare-one/applications/configure-apps/self-hosted-apps
[RNFLAP]: https://github.com/tsmith512/rnf-location-admin
[LIGHTSAIL]: https://aws.amazon.com/lightsail/
[PSQL]: https://www.postgresql.org/
[PGIS]: https://postgis.net/
[PRST]: https://postgrest.org/en/v8.0/
[FETCH]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[CFBLOG]: https://blog.cloudflare.com/modernizing-a-familiar-approach-to-rest-apis-with-postgresql-and-cloudflare-workers/
[COMPOSER]: https://getcomposer.org/
[RNFWP]: https://github.com/tsmith512/routenotfound/tree/master/wp-content/plugins
[APO]: https://developers.cloudflare.com/automatic-platform-optimization/
[STREAM]: https://www.cloudflare.com/products/cloudflare-stream/
[MAPBOX]: https://www.mapbox.com/mapbox-gljs
[MAPSTUDIO]: https://www.mapbox.com/mapbox-studio
[MYMAPS]: https://www.google.com/maps/about/mymaps/
[CALTOPO]: https://caltopo.com/

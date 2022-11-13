---
title: "Magic Roadtrip Itinerary Spreadsheet"
summary: >
  I created a Google Sheets template for planning "working roadtrips" that
  automatically calculates driving time and distance from the Google Maps
  Directions API. Have a copy!
tags: [side projects, travel, tools]
---

In 2015, as my then-employer was transitioning to fully remote
["working from home,"]({{< ref "2016-06-08-working-from-home" >}})
I went on a wild roadtrip with some good friends. It got me thinking:
what if that could mean "working from anywhere?" As folks start to see distributed
work in their futures, a few friends have asked me how I put these trips
together.

{{< media type="image" src="image.png" alt="Map of five years of roadtrip routes" >}}

I think it's easier to *have* a plan that I have no attachment to keeping rather
than constantly winging it, so I usually make a rough itinerary. I only find
meticulous planning to be important when I'm *working* on the road.

In those cases, I work days and drive nights. That adds logistical constraints:
the drive can't be too late for "a school night" and stop-overs need to be good
places where I'll be able to get in a solid day's work in a professional
environment — often with friends or family, hotel rooms/lobbies, or coworking
spaces. Call quality can significantly drop off in coffee shops and restaurants;
libraries or other public spaces can be a gamble. Having a backup plan and a
hotspot is useful, too.

{{< media type="image" size="" src="IMG_20180807_174432103.jpg" alt="Working in a hammock in a forest"  >}}

And in my unsolicited opinion on the virtues of the digital nomad: don't fake
it. Building good distributed work culture offers the opportunity to re-evaluate
what truly makes people productive and collaborative. Let's avoid giving leaders
reasons to backtrack to unhealthy "butts-in-chairs" performance monitoring.

So in celebration of 5 years since the
[Pacific Coast Highway](https://tsmithphotos.com/the-pacific-coast-highway?utm_source=tsmithcreative&utm_medium=website&utm_campaign=blog),
I offer up my itinerary template.

{{< media type="image" src="image2.png" alt="Sample itinerary spreadsheet" >}}

This is a lot less work than it appears — most of it is calculated. I just pick
a start date and city, then fill in stops along the way (Column D). The
spreadsheet automatically fetches the estimated time and mileage for each row
from the [Google Maps Directions API](https://developers.google.com/maps/documentation/directions/overview).
This makes it easy to play with alternate routes or shift hours between days.
Last summer, I had to work during a one-way run to Seattle before a vacation,
here are the routes I compared:

<!-- @TODO: Better video handling? -->
<p class="media">
  <video src="roadtrip-spreadsheet-example.mp4" poster="roadtrip-spreadsheet-example.png" width="1104" height="720" preload="none" controls>
  Video couldn't be embedded, but you can <a href="roadtrip-spreadsheet-example.mp4">download it</a> instead.
  </video>
</p>

Those numbers are based on default highway routes. I often prefer something more
interesting, but this is great for low-effort feasibility estimates. Besides, the
value of a scenic route can drop off pretty hard once it's dark out. And for
being just an estimate, it's surprisingly accurate.

{{< media type="image" src="image3.png" alt="Route map from the sample itinerary above" >}}

There's also a link to the full route in the header, but that only works because
of a bug in Google Maps — on the website, it is not possible to construct
directions for more than 10 stops, but it *will* accept links to longer
itineraries. For now. They will probably fix that.

# How to use this

Grab two things: my template and a Google Maps Directions API key.

1. [**Magic Roadtrip Spreadsheet Template v1.3**](https://docs.google.com/spreadsheets/d/1F8YS9itFJX2BhPECK2mDxnQXQ03g05iL3ypN2ftldJo/copy?usp=sharing)
  — Under the "File" menu, select "Make a Copy" to save an editable copy in your
  Google Drive.
2. **Google Maps Directions API Key** — This requires a developer and billing
  account, though the free tier is beyond sufficient for this level of usage.
  Google has some good documentation to get started:
    - [Directions API: "Get an API Key"](https://developers.google.com/maps/documentation/directions/get-api-key)
    - ["Get Started with Google Maps Platform"](https://developers.google.com/maps/gmp-get-started) which includes a one-click Get Started.
    - *(If you know me personally, I'm happy to provision a key for you. I just can't put it up on the internet unprotected.)*

**Once you have a key:**

1. Add your API key in the "Config" tab's cell `B2`
2. Go back to the "Route Plan" tab and add:
    - Start date in `B2`
    - Start city in `C2`
    - Start picking destinations in column `D`
    - To stay more than one night in a city, just repeat that city name in each row.

Be careful not to drag or cut cells in Column D; that will break formulas. Just
overwrite or *copy*-then-paste. Columns A through C (except the first row) and E
through G are all auto-calculated. If you try to edit these, there will be a
warning. To disable that warning, open
"[Protected Sheets and Ranges](https://support.google.com/docs/answer/1218656)"
in the _Data_ menu to remove the block so you can edit freely.

---

## How it works

The magic columns are E and F, and both work using the
[`IMPORTXML()`](https://support.google.com/docs/answer/3093342?hl=en) function
to query Google Maps Directions API and traverse the XML response to find the
answer. To pick apart an example:

{{< media type="image" src="image4.png" alt="Sample row showing a drive from Austin to Tulsa" >}}

The formula for E2 is:

``` js
=IF(
  AND( NOT(ISBLANK(C2)), NOT(ISBLANK(D2)), NOT(C2=D2) ),
  ROUND(
    IMPORTXML(
      "https://maps.googleapis.com/maps/api/directions/xml?" &
      "origin=" & C2 &
      "&destination=" & D2 &
      "&key=" & APIKEY & "&region=us&mode=driving", "//leg/duration/value")
    /60/60*1.1, 1
  ),
  "")
```

First, it checks if there is a drive on this day — are C2 (Austin, TX) and D2
(Tulsa, OK) *both* filled in *and* not the same? If so, `IMPORTXML` runs a
query. The response includes the full directions with a route summary. The
spreadsheet pulls the durationg and distances values from there.

{{< media type="image" src="image5.png" alt="Top of the XML response from GMaps Directions API" >}}

{{< media type="image" src="image6.png" alt="End of the XML response, 754 lines in total" >}}

_See the `xpath_query` argument `"//leg/duration/value"`._

For "Estimated Hours," it grabs `value` from the `duration` (seconds) and —
looking back at the cell formula — converts it to hours and adds 10%
(`/60/60*1.1`), *then* rounds it to the nearest tenth with [`ROUND(value,
1)`](https://support.google.com/docs/answer/3093440?hl=en).

``` js
=IF(
  AND( NOT(ISBLANK(C2)), NOT(ISBLANK(D2)), NOT(C2=D2) ),
  ROUND(
    IMPORTXML(
      "https://maps.googleapis.com/maps/api/directions/xml" &
      "?origin=" & C2 &
      "&destination="& D2 &
      "&key=" & APIKEY &
      "&region=us&mode=driving", "//leg/distance/value")
    /1609, 1
  ),
"")
```

For "Estimated Miles", the formula is similar, except `IMPORTXML` looks for the
`value` (meters) from `distance` instead, converts it to miles (`/1609`),
and rounds it.

In both cases, using the numeric `value` instead of the `text` string ("7 hours
2 minutes" or "452 mi") allows two things: being able to sum them for
totals and apply conditional formatting based on length.

Column G, the map between stops, just does some basic cell references:

``` js
=IF(
  AND( NOT(ISBLANK(C2)), NOT(ISBLANK(D2)), NOT(C2 = D2) ),
  HYPERLINK(
    "https://www.google.com/maps/dir/" & C2 & "/" & D2 & "/",
    "Map " & C2 & " to " & D2)
  , "")
```

The [`HYPERLINK()`](https://support.google.com/docs/answer/3093313?hl=en)
function does "make a link to directions from Cx to Dx and label it 'Map Cx to
Dx'."

{{< media type="image" src="image7.png" alt="Another sample route, focusing on columns A through D" >}}

Columns A, B, and C? Simpler calculations. A and B both "add one to the row
above" — Google Sheets is smart enough to properly handle `[date] + 1`
correctly. C copies diagonally from the previous row's Column D.

## [Named Ranges](https://support.google.com/docs/answer/63175) and [Conditional Formatting](https://support.google.com/docs/answer/78413)

The second tab in the spreadsheet is a worksheet called "Config." This is where
you add your API key and preferences about drive times. All of these are defined
as [Named Ranges](https://support.google.com/docs/answer/63175) so that they can
be used in formulas easily:

{{< media type="image" src="image8.png" alt="Named Ranges in the Config sheet" >}}

This is how the formulas in the last section were able to reference `APIKEY`
instead of writing the key directly into the cell formula *or* doing a
cross-sheet reference like `Config!B2`. These named ranges are also used in
conditional formatting, but there's a trick to that.

{{< media type="image" src="image9.png" alt="Sample route, focusing on conditional formatting applied to mileage and travel time" >}}

[Conditional Formatting](https://support.google.com/docs/answer/78413) is
applied to columns B, E, and F. Column B highlights weekends. Columns E and F
use the named ranges from "Config" to apply color to ideal/max driving
distance/time.

{{< media type="image" src="image10.png" alt="Sample route, with the date column selected to show how weekdays are highlighted" >}}

Conditional formatting to highlight weekends uses
[`WEEKDAY()`](https://support.google.com/docs/answer/3092985?hl=en) to format
`B2:B` with this custom formula:

``` js
=AND(WEEKDAY(B2,3)>4,WEEKDAY(B2,3)<7)
```

The `WEEKDAY()` function gets numbers for day-of-the-week. It has different
modes: in mode `3`, Saturday translates to `5` and Sunday is `6`.

{{< media type="image" src="image11.png" alt="Configuration of the conditional formatting using named ranges applied to travel time" >}}

For E and F, the conditional formatting compares against the named ranges in the
Config tab. Neither cross-sheet references (i.e. `Sheet!A1`) nor named ranges
can be used in formatting formulas directly. Instead, they have to be referenced
through [`INDIRECT()`](https://support.google.com/docs/answer/3093377?hl=en).

``` js
Minpoint:
=INDIRECT("HOURS_MIN")

Midpoint:
=(INDIRECT("HOURS_MIN")+INDIRECT("HOURS_MAX"))/2

Maxpoint:
=INDIRECT("HOURS_MAX")
```

# Take it for a spin

Grab a copy, take it for a test drive, and let me know what you think. Plan
something crazy. Go somewhere you've never heard of. Work from a cabin in the
woods for a while. See you out there!

_[Magic Roadtrip Spreadsheet Template v1.3](https://docs.google.com/spreadsheets/d/1F8YS9itFJX2BhPECK2mDxnQXQ03g05iL3ypN2ftldJo/copy?usp=sharing)_

---

In this time, I do feel compelled to add: I've had this post in the hopper for a
while. Circumstances have since changed. Please consider the impact any travel
has on community spread and the disproportionate effects on remote communities.
I know I'm certainly looking forward to travel re-unleashed one day. Until then,
we must step lightly and acknowledge how leave-no-trace has taken on a whole new
meaning.

{{< media type="image" size="" src="IMG_20181118_110155051.jpg" alt="View down from an overlook at a dirt road in Death Valley"  >}}


# Template Changelog

- v1.3
  - Add red highlighting and an error message in the header row if the API
    key is missing. Add link to blog post for instructions in Config sheet.
- v1.2
  - Add the "stopover detection" from Column G into E and F, preventing API
    calls on rows with the same start and stop points.
  - Update Conditional Formatting so that 0 miles/hours days are greyed out
    instead of green.
- v1.0
  - Finally consolidate all those copies-of-copies into a template and fix all
    the broken stuff.

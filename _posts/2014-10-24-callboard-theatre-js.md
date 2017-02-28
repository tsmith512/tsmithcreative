---
title: Taking JavaScript to the Theatre
summary: Callboard is a frontend JS prototype application to help stage managers make preshow calls on a complex schedule.
layout: post
tags: [development, theatre, js]
---

<div class="callout">
Also appears on <a href="http://fourword.fourkitchens.com/article/callboard-javascript-goes-theatre">FourWord</a>, the blog of <a href="http://www.fourkitchens.com">Four Kitchens</a>. See the full project on <a href="https://github.com/tsmith512/callboard">GitHub</a>.
</div>

![Callboard][IMAGE]

_(Are you a theatrical worker? [Jump to the project page][CB].)_

## JavaScript goes to the theatre

When not building websites for [Four Kitchens][4K], I am a deck manager and
theatrical electrician. For [Zilker Theatre Productions'][ZTP] _Oklahoma!_ in
2014, I managed backstage scheduling and gave warning calls to the rest of
the company as we worked through the schedule each evening. With a wristwatch, a
bit of focus, and lots of caffeine, this was easily manageable. But distractions
pop up backstage, and I like automating things with code.

[Callboard][CB] ([demo][DEMO]) is a simple web app that takes an easily-editable
schedule and produces a list of countdowns for warnings and events using
[Countdown.js][CD] and [Moment.js][M]. At the space, I navigated to the site on
my phone and checked it periodically while I handled my other pre-show tasks.
When my phone buzzed, it was time to get up, make a lap of the space and holler
at people (politely...).

Among others, I defined these events:

- Actors to venue
- Fight and fall rehearsals
- Dance calls
- Sound check
- Top of Show
- Places

And the warnings that I wanted to give for each:  
_("Ten minutes to top of show!", "Five minutes to the fight rehearsal!", etc.)_

- _Actors to venue:_ Just an item on the schedule, no warnings.
- _Fight and fall rehearsals:_ 5 minutes and on-time. (Although really, I ran
  this as soon as cast members were ready.)
- _Dance calls:_ 10 minutes, 5 minutes, and on-time.
- _Sound check:_ 10 minutes and on-time.
- _Top of Show:_ 30, 15, 10, and 5 minutes (_no_ on-time, since I'd call Places
  at two minutes).
- _Places:_ On-time for the event, which was defined as two minutes before Top
  of Show.

Combined, that looks like this:

``` js
var calls = [
  {
    event: 'Actors to Venue',
    time: '7:00pm',
    // No announcement for the venue call. It's not like they'll be early...
    warnings: []
  },
  {
    event: 'Sound Check',
    time: '8:00pm',
    warnings: [10, 0]
  },
  {
    event: 'Top of Show',
    time: '8:30pm',
    // We don't give a warning for TOS, that's the Places call
    warnings: [30, 15, 10, 5]
  },
  {
    event: 'Actors and Band to Places',
    time: '8:28pm',
    // Other warnings are for TOS, this is an event for a special 2-min warning
    warnings: [0]
  },
  {
    event: 'Go for Act One',
    time: '8:30pm',
    warnings: [0]
  }
];
```

Callboard takes these data and builds out three displays:

- **Announce:** Show current warnings for two minutes in large text, useful for
  an unattended display.
- **Calls:** A running list of countdowns to current and future _warnings_,
  color-coded by how soon they must be called. Events are not included.
- **Schedule:** A full list of countdowns to each _event_. Warnings are not
  included.

![Three displays][DISPLAY]


### Retrospective: was it useful and did it work?

The goals were:

- To make sure everyone had the prep time they needed for each item on the
  schedule so we were ready to start on time each evening,
- To minimize surprises if the schedule had to change,
- And to make it easy for me to _not_ have to think about either.

So, yes! This bit of cross-disciplinary nerdiness worked out well. It was useful
to have a brain backup because pre-show hours can be very busy.

### Future roadmap / current limitations

I'll keep tweaking this as I use it for future shows. Currently there are a
handful of things I'd like to work on:

- **A generator for the `calls.js` file which defines the events and warnings.**
  - For anyone who isn't handy with a code editor, this project is less useful
    than if the config file were automatically generated.
- **Offline access**
  - _Oklahoma!_ was performed outdoors. Mid-summer. In Texas.
  - ![Words of wisdom, or lack thereof][BRAIN]
  - But at least the cell service was solid...
  - Indoor theatres frequently have poor reception or wifi that is used for
    equipment control instead of internet access. This web app won't work
    without a network connection to the hosting environment. I'd like to change
    that so it can work locally.
- **Performance tweaks**
  - When I saved it to my [homescreen as a Chrome webapp][HOMESCREEN],
    the counts would stall out if I switched to another application for too
    long or turned off the screen for more than a few minutes. I think
    suspending the update interval when the window loses focus could fix this.
    (In the meantime, it works fine in-browser.)
  - There's not a loading indicator while the lists are being set up, but there
    is a noticeable delay between pageload and the appearance of any generated
    content. I'd like to fix both of these issues.
  - Better templating would make rendering faster and code more legible. At the
    moment, templates are strings with keywords which get `.replace()`-ed.
- **Stopwatch or "Act Two" features**
  - Act two started fifteen minutes after houselights came up following act one.
    I just started a stopwatch on my phone for that and did the math to make
    those calls, since there were fewer. It would be nice to have an easy way
    to add that second "mode".
  - A current workaround would be to host two separate copies of this project,
    one setup as described, and the other setup like the [demo][DEMO] where the
    "events" are all set relative to the time at pageload and load that when
    intermission starts.
- **Midnight is a problem**
  - How I invoked simple time parsing in Moment.js ignores dates, so a call at
    11:30pm happens "tonight," but a call at 12:30am would have already happened
    "this morning," and it would be sorted at the top of the list. I didn't have
    a show schedule that surfaced this condition, but it would be a serious bug
    to anyone who does.
- **On-the-fly changes**
  - Not sure what form this would take, but sometimes you just know you're gonna
    have to hold house. The counts can't be updated from the phone, and there is
    no "delay" feature, but something like that could be useful... unfortunately.
    - _(Shoutout to the_ Oklahoma! _crew: in a whole summer, that only happened
      twice, and they got us back on track very quickly.)_

[IMAGE]: /assets/blog/callboard-theatre-js/callboard.jpg
[4K]: http://www.fourkitchens.com
[ZTP]: http://www.zilker.org
[CB]: http://www.github.com/tsmith512/callboard
[DEMO]: http://tsmith512.github.io/callboard
[CD]: http://countdownjs.org/
[M]: http://momentjs.com/
[DISPLAY]: /assets/blog/callboard-theatre-js/displays.png
[R]: https://github.com/tsmith512/callboard/releases
[GH]: https://github.com/
[FORK]: https://help.github.com/articles/fork-a-repo
[TW]: http://twitter.com/tsmith512
[GHI]: https://github.com/tsmith512/callboard/issues/new
[HOMESCREEN]: https://developer.chrome.com/multidevice/android/installtohomescreen
[BRAIN]: /assets/blog/callboard-theatre-js/brainmissing.jpg

---
title: "DrupalCon 2018: Nashville"
summary: >
  That time I went with Four Kitchens to Nashville for a week of hot chicken,
  Drupal, exciting sessions, professional development, and showcasing our VR/AR
  work.
tags: [events, drupal, 3d printing, management, VR and AR]
---

Many thanks to all for a great week in Nashville. Learned a lot and got excited
about a few things. I haven't done a trip report before, but here's my
long-winded rundown of my experience.

## Four ~~Kittens~~ Chickens

This is what you really wanted to know: the annual [Four Kitchens][4K] _Four Kittens_
shirt is on temporary re-brand for cultural relevance: may I present to you
**Four Chickens!** Hope you got one at the booth because we're fresh out.

{% picture /blog/drupalcon-nashville/chickens.jpg --alt The Shirt %}

_\* Nashville's primary culinary export is its famous hot chicken. It's damn tasty._

## Booth Time

[Four Kitchens][4K] was the Drupal Games Sponsor again this year, so when
visitors weren't playing basketball and ping pong, we had lots of demos to show
and some experts to talk to about our recent web shenanigans.

### VR, AR, and WebVR

360 imagery and 3D models can be created easily with relatively inexpensive
technology and displayed on the web using open source libraries, built-in
browser APIs, and devices that many audiences will find approachable if not
already something they own.

{% picture /blog/drupalcon-nashville/booth-collage.jpg --alt Booth Shenanigans %}

We had a few scans from our own Web Chefs over the past few weeks, I'd even 3D
printed a few of them. I'll be selling limited edition Todds and Aarons on Etsy\*.

_\* No. But I might write a blog post on it._

#### Scanning Guests and [3D/VR Postcards][BUST]

We had two iPads to scan interested visitors with [itSeez3D][IS3]. Behind the
scenes, the models were emailed to an endpoint which would receive the OBJ file,
upload it to our Drupal 8 (Contenta distribution) site and compose it into a
[little virtual postcard][BUST].

#### [EditVR][EVR]

{% picture /blog/drupalcon-nashville/editvr-noshadow.png --alt EditVR %}

Four Kitchens also unveiled [EditVR][EVR], a decoupled, Drupal-backed
React-fronted VR editor to combine 360 photographs, annotations, sounds, and
images into experiences which can be delivered in the browser, on mobile devices
using Cardboard or Daydream, or on desktop computers with VR hardware.

It's currently a closed beta, but I'll update when public guests can create
accounts. In the meantime, the same technology and libraries that power EditVR
are also in use on [some of our projects][FKVR]:
the [Meredith Farming Shop Tour][MVR] and
[Working with the Web Chefs][FKVRTOUR].

#### [Aerate][AE]

{% picture /blog/drupalcon-nashville/aerate-noshadow.png --alt Aerate %}

We also had info about the newly released [Aerate][AE] frontend performance
auditing tool. Evan Willhite, its maintainer, was also at the booth ready to
talk, but I think with all the hubbub over the VR demos, Aerate didn't get as
much attention as I wish it had.

## An Experiment

This conference, **I used a paper notebook** during every session I attended.

**What follows is the translation of those notes into digital form** while I can
still read them. My handwriting is slow and bad (also painfully cramp-inducing)
but I found the effort worth it. I paid more attention to what was presented
when my laptop wasn't in front of my face with notifications and the temptation
to "let me Google that thing the presenter just said."

{% picture /blog/drupalcon-nashville/notes.jpg --alt Handwritten Notes %}

_I use a [RocketBook][RBN] notebook so that I can take a quick picture with my
phone and the page lands in OneNote with a dated backup in Google Drive, hence
the QR code. Also apparently I still write on my hand._

## Notes from Sessions I Attended

### [Decoupled Drupal Hard Problems][SESDD]

_[Mateu Aguiló Bosch][SMAB], Senior Developer at [Lullabot][VLUL]_

We're investigating a decoupled/headless build for a client at [4K][4K] and
while I understand the concepts and overall architecture, my experience in the
tactics of headless is limited. Deeper technical understanding helps me be a
better <abbr title="Product Owner">PO</abbr>, so I dropped by this "clearly over
my head" session. Mateu presented his material in a very approachable way and
touched on:

- **Sequential requests are slow.** For example, if you have to look up an ID to
  then fetch more information about it in a subsequent request, that's an extra
  set of round trips. He showcased how the [Subrequests Modules][MSUB] module
  allows "blueprinting" an initial request to let the server run secondary and
  tertiary lookups and return all the information in bulk.
- **Using [Schemata][MSCH]** for building schemas of content models
  automatically, to keep content models and APIs documented and in sync.
- **URLs a convention are for browsers** that have been adapted for REST API
  use, too, but their original intent was for web browsing and SEO. Drupal has
  always handled content vs. "user/SEO friendly" paths with Alias and Pathauto
  well. Example: Subrequests would make it easy to act on a node ID by making a
  request on the Aliased path and blueprinting the subsequent request.
- **Drupal makes API versioning super hard** if not impossible. There's no
  built-in support for it, though I suspect you could write custom routes
  prepended with API version numbers or have clients send version headers.
  However, the _content model_ is definitely not versioned. Dropping a field in
  v3? If you actually delete the field from the node type, it's gone in v1 and
  v2, also. So while headless systems allow for a lot of rapid iteration,
  redevelopment of the _content model_ is really tricky.

My biggest "ah ha" was this comment:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Had a decoupled-related ah-ha this morning, &quot;When an editor controls how something looks, you&#39;ve coupled your editor interface to a single API consumer&quot; -- <a href="https://twitter.com/e0ipso?ref_src=twsrc%5Etfw">@e0ipso</a> <a href="https://twitter.com/hashtag/DrupalCon?src=hash&amp;ref_src=twsrc%5Etfw">#DrupalCon</a></p>&mdash; Taylor Smith (@tsmith512) <a href="https://twitter.com/tsmith512/status/983746302851928064?ref_src=twsrc%5Etfw">April 10, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Because all our clients want fancy WYSIWYG tools and rich or in-place editors,
we need to be able to have specific conversations up-front with them about how
to keep content accessible across other platforms. We're not just showing
content on web pages anymore. This is like leading clients through "responsive
means more than just desktop screens" on a whole new level.

### [Don't Trust Your Gut: Agency Operations Metrics][SESDTG]

_[Ashleigh Thevenet][SAT], Chief Operating Officer at [Bluespark][VBS]_

Ashleigh showcased the magic spreadsheets she uses to run Bluespark, derived
from <abbr title="CEO of ThinkShout">Sean Larkin's</abbr> originals:

By combining team forecasting/allocations, actual hours worked, contracts
closed, project estimates, and more, these spreadsheets produce good visibility
into overall booked work, velocity requirements to meet contract totals or
milestone timelines, team utilization, and even insights into revenue
forecasting, team health, and hiring decisions.

- The Megasheet! [http://bit.ly/2qjlDOZ](http://bit.ly/2qjlDOZ)
- The Billable Hours Matrix [http://bit.ly/2qoxJXl](http://bit.ly/2qoxJXl)

I think all businesses in our industry, and probably any time-and-materials
consultancy, use all of these metrics. I really appreciate that within this
community, we share how we do it since we all face many of the same problems.

At [4K][4K], we also do this, but <abbr title="Director of Projects and Project
Management">Suzy</abbr> and I, with help from others, have automated the data
collection process and she has built out reports and dashboards using
[Periscope][PSD]. Same analysis but since our team is larger than Ashleigh's, we
wanted an automated process. Either way, both companies benefit from financial
insights in near real-time that would traditionally be analyzed less frequently.

### [Lessons Learned from Open Source Journalism][SESOSJ]

_[Sydette Harry][SSH], Editor at [Mozilla Foundation][VMF]_

Here's a session that ended up being nothing like what I expected and I was
_super_ glad I went. Sydette introduced the [Coral Project][CORAL]'s first three
applications:

- **[Ask][ASK]** to collect information from an audience. A more journalism
  focused alternative to something like a SurveyMonkey, with some of the
  features of a ticketing system like tag/search/followup tools. An API makes
  bulk reporting and visualizations easy, like these election-related examples
  from [Newsday][NDTRUMP] and [Philly.com][PHTRUMP]. And while the _display_ of
  responses can be edited for grammar/spelling or language moderation, the
  application retains the original submission intact so that journalists have
  that unfiltered view into the attitudes and needs of their audience.
- **[Talk][TALK]** is a new way to deal with comments. Online comments are
  broken. Many devolve into flame-wars over discourse, polarization over the
  quest for common ground, or just unproductive hate speech. Talk offers
  functionality to try and moderate the conversation in a safe way and
  sidesteps the privacy or content ownership concerns of third-party comment
  management systems like [Disqus][DIS].
- **[Guides][GUIDES]** are a series of guides, tutorials, and worksheets from
  experts on online community building, engagement, journalism, and moderation.
  They include things like:
  - Writing a community mission statement
  - Know your legal responsibilities
  - Managing a user who crosses a line
  - Avoiding malware from form submissions
  - Case studies on ProPublica, Brexit discussions, and New York Times
  - Links to third-party resources

From there, the conversation turned into an organic conversation on online
community building focusing on three questions. _See the [session video][OSJYT]._

1. Who is "we"?
2. Why is "we" here?
3. What is "we" <abbr title="Yes, I'm not the only one who says this.">fixin' to</abbr> do?

_Then:_ How do these answers change if everyone in this "we" under stress?

Instead of comment wars, how are communities built to encourage engagement?

> When it's "us" versus "them," the focus is on having a _score._ When it's "we"
> the focus is on reaching a _result._

And:

> When it's "us" versus "them," there's this stop and go and stop and go and
> nobody feels good about it. When it's "we," it's "that wasn't what _we_
> wanted, how do we improve?" Or "that's it! how do _we_ get more of that?"

### [What Do You Want to be When You Grow Up?][SESWTD]

_[Genevieve Parker][SSP], Operations Manager_ &amp;
_[Aimee Degnan][SAHD], CEO / Architect at [Hook 42][VH]_

"What do you want to be when you grow up?" is a question everyone hates because
it's hard to answer. This session talked a lot about professional development
through structured, caring, high-engagement management. The 4K Project Managers
book club recently read _[The Effective Manager][TEMBOOK]_ and a lot of the 1x1
structure Aimee and Genevieve discussed follows a similar pattern.

They also discussed _motivators_ vs. _incentives:_

- Incentives (the carrot) are action focused. Quicker, but not a lasting change.
  Importantly, "money is only an incentive for so long."
- Motivators are attitude focused. It's a slow burn, but it produces a long-term
  change, greater confidence, and greater accountability. It's the "what is my
  purpose here?" effect.

Also, not everyone wants to climb the corporate ladder. If you have team members
who don't want to manage or project leads who don't want to go into business
leadership, "growth is learning at the current level."

And: **imposter syndrome** which is a real thing. "Trust that the person who
hired you did so for a reason." Step back, and "look at objective facts" rather
than subjective self-criticism. Management can support this by recording useful
facts.

With regard to course corrections, high-engagement management can facilitate
some meandering on the career path:

> It's never too late to have a happy childhood.

The take-home work here is in tooling. Hook 42 uses:

- Slack, including a private channel for each employee with their manager(s) and
  an HR rep for an ongoing conversation.
- Google Drive, including a shared folder for each employee for check-in notes,
  goals, and other documentation.
- **[Adobe Check-in][ACI]** (new to me) which features a huge set of growth plan
  documents and the **Individual Development Plan** (not an HR Personal
  Improvement Plan).

An idea they posited: if you're having trouble answering these kinds of
questions or aren't sure where you're headed, ask a friend or mentor to write a
short bio about you or fill out a copy of some Adobe Check-in sheets for you.
Their view on your most valuable skills and passions might help you with ideas.

Ultimately, I still hate the "what do you want to be when you grow up" question,
but this session had some cool personal-professional development ideas I'd like
to look at.

### [(In)organic Groups in Drupal 8][SESOG]

_[Scot Self][SSS], Senior Developer at [Mobomo Apps][VMA]_

Running out of steam, this was my last session to attend. It was a pretty high
level look at the [Organic Groups][OG] and [Group][GRP] modules. I've used <abbr
title="Organic Groups">OG</abbr> in Drupal 7 on several projects with
complicated use cases. It's one of those D7 modules that makes magic happen. But
it seems stalled in D8 and there's only a pre-alpha release. Group is making big
strides and has production-ready releases for 8.x. I assume I'll have plenty of
uses for Group in the future, but I needed a primer on how Group is different
from OG as I help clients with their strategies. At a high-level, it's actually
pretty similar.

{% collapsed Comparison notes on OG vs Group %}

- Both modules:
  - Have the concept of adding content (nodes) and users to groups (i.e.
    membership)
  - User roles within groups which are distinct from system roles (e.g. group
    admin can manage content within the group but not content outside the group)
  - Make few assumptions about the use cases
- [Organic Groups](https://www.drupal.org/project/og) for D7
  - Pros:
    - Super widely used (top 100 module)
    - Good API and <abbr title="Developer Experience">DX</abbr>
    - Tons of contributed submodules to extend OG's native functionality
  - Cons:
    - Relies on _fields_ (i.e. there's a multi-value field on each entity that's
      basically an entity reference field pointing to the group it's a member
      of). Even OG's maintainer points out that this is an abuse of the idea of
      the Field API.
    - Confusing UX
    - D8 progress is early-stage and stalled
- [Group](https://www.drupal.org/project/group) for D8
  - Pros:
    - A "Group" is a true fieldable entity, not a node, so it gets first-class
      treatment across the Drupal API/ecosystem as an Entity-with-a-capital-E
    - Member users/content are added to groups via a membership entity
      - This reminds me of the D7 module Relation
      - So it's an extra step in entity lookups, but the Entity API does the
        heavy lifting and it makes more sense in Drupal-world.
      - This also means that the _membership_ can have fields, too. Example: how
        long as Sally been a group member, what is Joe's title within the group,
        etc.
      - Finally, it makes "many-to-many" multi-group membership a little more
        straightforward.
    - Good API/DX
    - A single group can't override settings on the group _type_
      - Node (Entity) : Node Type (Bundle) :: Group : Group Type
      - So a "Group Type" is the "Content Type" of the group and defines fields
        that Groups can have.
      - In OG, some options for group behavior can override what the group type
        specified. This could lead to confusion and weirdness.
  - Cons:
    - Needs UX love, there are some confusing options with confusing results
      before you get used to it
    - Confusing nomenclature
    - No _Configuration Entity_ integration yet
    - That thing about how "A single group can't override group type settings"
      because it opens the door for a mess in OG, but without that ability
      there's some flexibility lost.

{% endcollapsed %}

Ultimately, it seems like everything I've built in OG with Drupal 7 would be
pretty reasonably doable with Group in D8. The big question is what is the new
equivalent of the [OG Menu][OGM] module because the ability to produce a
group-bound menu of content is pretty key to a lot of those use-cases.

## [Four Kitchens Sessions][SESFK]

I didn't present this year, but plenty of us did! Speaking to packed houses and
even some standing-room-only crowds, congratulations to Patrick Coffey, Mike
Minecki, Joel Travieso, Jeff Tomlinson, Adam Erickson, Trasi Judd, and Randy
Oest (top-left to bottom-right).

{% picture /blog/drupalcon-nashville/presentations.jpg --alt 4K Presenters %}

Check out _[We’re Going to Nashville! Web Chefs Heat Things Up with Talks at DrupalCon][SESFK]_ on the 4K blog for a summary of all our sessions.

## Action Items

Conferences always get me excited about stuff, but accountability helps make
sure I follow through. So here's what I want to do:

- Write about 3D printing the models from the 3D scanners
- Write about 4K's business intelligence application
- Install Ask and fiddle with it
- Look at Talk as an alternative commenting system
- Download and fill out the Adobe Check-in [toolkit][ACIT]
- Research OG Menu's new equivalent
- Propose a session to DrupalCamp Colorado in Denver this August

{% picture /blog/drupalcon-nashville/booth-group.jpg --alt Booth Group %}

[4K]: https://www.fourkitchens.com
[IS3]: https://itseez3d.com/
[BUST]: https://www.andbust.fun/taylor
[EVR]: https://www.editvr.io/
[FKVR]: https://www.fourkitchens.com/knowledge/tools-frameworks/vr-playground/
[MVR]: http://shoptour.fourkitchens.com/
[FKVRTOUR]: http://webchefvr.fourkitchens.com/
[AE]: https://www.fourkitchens.com/blog/development/introducing-aerate-frontend-performance-made-easy/
[RBN]: https://getrocketbook.com/
[SESDD]: https://events.drupal.org/nashville2018/sessions/decoupled-drupal-hard-problems
[SMAB]: https://twitter.com/e0ipso
[VLUL]: https://www.lullabot.com/
[MSUB]: https://www.drupal.org/project/subrequests
[MSCH]: https://www.drupal.org/project/schemata
[SESDTG]: https://events.drupal.org/nashville2018/sessions/dont-trust-your-gut
[SAT]: https://twitter.com/bluesparklabs
[VBS]: https://www.bluespark.com/
[PSD]: https://www.periscopedata.com/
[SESOSJ]: https://events.drupal.org/nashville2018/sessions/lessons-open-source-journalism
[SSH]: https://twitter.com/blackamazon
[VMF]: https://www.mozilla.org/en-US/foundation/
[CORAL]: https://coralproject.net/
[ASK]: https://coralproject.net/products/ask.html
[TALK]: https://coralproject.net/products/talk.html
[NDTRUMP]: https://projects.newsday.com/opinion/donald-trumps-progress-report
[PHTRUMP]: http://www.philly.com/philly/news/politics/400537181.html
[DIS]: https://disqus.com/
[GUIDES]: https://guides.coralproject.net/
[OSJYT]: https://www.youtube.com/watch?v=--IFEp3yCEc
[SESWTD]: https://events.drupal.org/nashville2018/sessions/what-do-you-want-do-when-you-grow
[SSP]: https://www.drupal.org/u/genevieveparker
[SAHD]: https://twitter.com/aimeeraed
[VH]: https://www.hook42.com/
[TEMBOOK]: https://www.amazon.com/Effective-Manager-Mark-Horstman/dp/1119244609
[ACI]: https://www.adobe.com/check-in.html
[ACIT]: https://www.adobe.com/check-in/toolkit.html
[SESOG]: https://events.drupal.org/nashville2018/sessions/inorganic-groups-d8-group-module
[SSS]: https://twitter.com/scotself
[VMA]: https://www.mobomo.com/
[OG]: https://www.drupal.org/project/og
[GRP]: https://www.drupal.org/project/group
[OGM]: https://www.drupal.org/project/og_menu
[SESFK]: https://www.fourkitchens.com/blog/office-news/going-nashville-web-chefs-heat-things-talks-drupal-con/

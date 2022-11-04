---
title: "DrupalCon 2019: Seattle"
summary: >
  Another year at DrupalCon, this time with hiking, UX fortune telling, a
  (machine learning) brain in a (content editor) box, a focus on accessibility
  and inclusion, and other great sessions.
tags: [events, drupal, product management, 3d printing]
galleries:
  a:
    - src: /blog/drupalcon-seattle/pre/IMG_20190406_125039008.jpg
      alt: Forest trail
      caption: Rattlesnake Ledge hike
    - src: /blog/drupalcon-seattle/pre/IMG_20190406_132325012.jpg
      alt: View showing mountain in rain
      caption: Rattlesnake Ledge
    - src: /blog/drupalcon-seattle/pre/IMG_20190406_132954.jpg
      alt: Rattlesnake Ledge
      caption: View from the top of Rattlesnake Ledge
    - src: /blog/drupalcon-seattle/pre/IMG_20190406_133725019.jpg
      alt: A dumb selfie
    - src: /blog/drupalcon-seattle/pre/IMG_20190406_155325033.jpg
      alt: Snoqualmie Falls
      caption: Snoqualmie Falls
    - src: /blog/drupalcon-seattle/pre/IMG_20190406_224749.jpg
      alt: City view of Seattle from Capital Hill
    - src: /blog/drupalcon-seattle/pre/IMG_20190407_142025063.jpg
      alt: View of the Wallace Falls Upper Falls
      caption: Wallace Falls
    - src: /blog/drupalcon-seattle/pre/IMG_20190407_142120064.jpg
      alt: Wallace Falls Lower Falls
      caption: Wallace Falls
    - src: /blog/drupalcon-seattle/pre/IMG_20190407_143815071.jpg
      alt: Waterfalls
    - src: /blog/drupalcon-seattle/pre/IMG_20190407_144210072.jpg
      alt: Trail in fog
  b:
    - src: /blog/drupalcon-seattle/pre/IMG_20190408_192304.jpg
      alt: Indoor climber at Seattle Bouldering Project
      caption: Anthony at Seattle Bouldering Project
    - src: /blog/drupalcon-seattle/pre/IMG_20190408_195000001.jpg
      alt: Me at Seattle Bouldering Project
      caption: Web Chef Boulders
    - src: /blog/drupalcon-seattle/pre/IMG_20190412_113847.jpg
      alt: Seattle's Gum Wall
      caption: Gross.
    - src: /blog/drupalcon-seattle/pre/IMG_20190412_164631.jpg
      alt: Puttputt golf game at a bar
  c:
    - src: /blog/drupalcon-seattle/booth/IMG_20190409_170406079.jpg
      alt: Strategist dresses in fortune teller costume
    - src: /blog/drupalcon-seattle/booth/IMG_20190409_175534089.jpg
      alt: People in circus-themed trade booth with man pointing at screen
    - src: /blog/drupalcon-seattle/booth/IMG_20190409_185421093.jpg
      alt: Me having my face painted by the Four Kitchens Operations Director
    - src: /blog/drupalcon-seattle/booth/IMG_20190411_091230101.jpg
      alt: Employee in a company jacket juggling mini basketballs
    - src: /blog/drupalcon-seattle/booth/IMG_20190411_094138104.jpg
      alt: Founder in a company jacket playing ping-pong
---

My thanks to the Drupal Association, DrupalCon organizers, Four Kitchens, fellow
presenters and colleagues, and to my good friends who showed me an amazing time
in Seattle! Here's how it happened.

## Washington Funtimes

{% include gallery.html gallery=page.galleries.a %}

At a friend's recommendation, I did the
[Rattlesnake Ledge hike](https://www.alltrails.com/explore/recording/recording-apr-06-03-01-pm--3)
and also discovered
[Wallace Falls](https://www.alltrails.com/explore/recording/recording-apr-07-03-35-pm--3),
each about an hour east of town through totally stunning scenery. I also hit up
a handful of things in town with friends, too.

{% include gallery.html gallery=page.galleries.b %}

## DrupalCon

**The Four Kitchens \[Circus\] Midway** (or, as it was titled in the program,
"The Games Area") was our booth theme this year. In addition to our usual games
and swag, we had a number of cool demos!

{% include gallery.html gallery=page.galleries.c %}

Our Frontend team talked up
**[Emulsify](https://github.com/fourkitchens/emulsify)**, a component-driven
prototyping tool using Pattern Lab v2 that also serves as a starter-kit Drupal 8
theme. We also had some examples from real client work on display.

UX Strategist Emily was our **UX Fortune Teller**, offering 10-15 minute private
consultations and Q&As on everything from light site audits to user research
opportunities and techniques.

We were also showing off **[HappyGram.ai](https://www.happygram.ai/)**, a
Drupal-backed website that paired its content editor with Google's Natural
Language Processor to automatically analyze the contents and tone of a postcard
message and suggest stock images and color alterations to fit.
[Learn more about augmenting content management tools with machine learning](https://www.fourkitchens.com/lp/ai-machine-learning)
on the 4K blog.

### Sessions I Attended

**[Beyond the Screen Reader: Humanizing Accessibility](https://events.drupal.org/seattle2019/sessions/beyond-screen-reader-humanizing-accessibility) with Alanna Burke _(Kanopi Studios)_**

Of course accessibility is important — beyond being a legal requirement for many
of our non-profit or higher-ed clients, it's simply the right thing to do. But
Alanna pointed out something that really resonated with me — improvements to
accessibility are good for *everyone* because things that many users find
*annoying* are *really bad* for accessibility.

Many companies insist on using carousels/rotators, animation or scrolling
effects, deep menus with hover states, or burying important information behind
pages of largely useless content. These things are irritating for *everyone*.
But they also present challenges, often insurmountable, for many users who also
deserve first-class access, including those who are low-vision, may have
difficulty with precise mouse movements, or get migraines or seizures.

Alanna also spoke about the idea of a "Situational Disability," which is less
about a user's current physiological state than just what's going on with them
in the moment, like being distracted by something, having a slow internet
connection. Building on that same line of thinking, she talked about how a
website needs to be able to respond to "Stress Cases" — in a moment of urgency
and stress, can someone get critically important information from your site?

Her example, "a loved one has been taken to the emergency room at [local
hospital]." As an audience of tech professionals, we're exceptionally good at
searching for information. But her local hospital example had *no* information
about how to contact the ER or where it was physically located — instead its
page about the ER offered a list of services and awards they'd received.
**Don't ask "What do we want on the home page," ask "What do users need to know immediately?"**

She closed with a [classic XKCD example](https://xkcd.com/773/), "University Website"

<Media type="image" size="mini" src="/assets/blog/drupalcon-seattle/xkcd-univ-website.png" alt="The XKCD Comic called 'University Website'"  />


**[Ignore the Naysayers: Your RFP Can Be Brilliant!](https://events.drupal.org/seattle2019/sessions/ignore-naysayers-your-rfp-can-be-great) with Joe Crespo _(Aten Design)_**

Four Kitchens has long seen RFPs as a hindrance to good relationship building.
Take Todd's 2012 presentation slide deck,
"[No RFPs! Why requests for proposal are bad for business (and how we can stop them)](https://www.slideshare.net/fourkitchens/no-rfps-why-requests-for-proposal-are-bad-for-business-and-how-we-can-stop-them)".
So when I saw Joe from Aten talking about this, I thought it was a bit of a
challenge.

He acknowledged that the RFP process does have issues. How does a 50-page
document without much important information actually help anyone? They're costly
to issue and respond to. Further, they're designed to produce comparisons for
specific kinds of goods and services across vendors, but they are very poorly
suited to soliciting creative work because their nature removes personality and
innovation.

Ultimately, Joe agreed to avoid them if you can but had some great ideas for
how to better navigate the process. Some highlights:

- Reduce prescriptive requirements because they are very limiting. You're
  talking to consultants, focus on objectives and goals.
- Pre-qualify your vendors because "spray and pray" attracts responses from
  shops that aren't busy enough.
- Include the timeline and *why*.
- Tell us the RFP scoring criteria!
- It must be a searchable document. Don't produce images of text or unsearchable
  PDFs.
- Separate or eliminate the boilerplate. Otherwise, put your entire product
  discussion in an appendix to keep it together and just fill in the blanks on
  the RFP.
- **Definitely, share the budget.** This helps us right-size the approach, saves
  everyone time if the vendor isn't a good fit on price, and ultimately allows
  you to not have to judge solely on price. You need an apples-to-apples
  comparison. If each RFP takes a different approach because they don't know the
  budget, you can't compare what you're being presented.

**[Grouped User and Content Management in D8](https://events.drupal.org/seattle2019/sessions/grouped-user-and-content-management-d8) with Christina Elmore and Jesse Nicola _(OSHU)_**

This was a case study in how Oregon Health and Science University migrated an
ecosystem of tightly branded and integrated "sites" into to Drupal 8 and
structured them using the [Group module](https://www.drupal.org/project/group).
This ended up being a more use-case focused discussion to complement the
technical session I saw [last year](https://www.tsmithcreative.com/blog/2018/dc-nashville/) called
[(In)Organic Groups in Drupal 8](https://events.drupal.org/nashville2018/sessions/inorganic-groups-d8-group-module).
And it confirms my hypothesis that projects I've done in the past with Organic
Groups on D7 would be well suited to
[Group](https://www.drupal.org/project/group) in D8.

OHSU's two *primary* requirements were:

- Globally locked down theme beyond changing out certain graphics and setting up
  a content hierarchy that suits the particular site.
- Different kinds of users with access to manage different sets of content —
  some are department specific or need oversight. Some don't need oversight and
  work across multiple departments.

This describes exactly what Four Kitchens built for Texas Exes (an alumni org
for Univ. of Texas) in 2014, which I did with a lightweight implementation of
Organic Groups to allow regional chapters to have their own "sites" on the
platform.

OHSU used Group with several group types but few content types, and powered
content building with Paragraphs. They pointed out that the Group module is very
flexible but rudimentary out-of-the-box. A lot of relationships, site-building,
and some custom code make it shine. Further:

- Group's built-in dashboards make content management really easy.
- Group does work with the new Workflow initiatives in D8!
- They did a lot of custom work with regard to making menus work (but there may
  be a forthcoming update to Group or Group Menu that can help) and showing
  content on Group-aware Pathauto aliases.

**[Drupal as a Data Warehouse: Everybody Into the Data Lake!](https://events.drupal.org/seattle2019/sessions/drupal-data-warehouse-everybody-data-lake) with Gail Radecki _(AAAAI)_, Ezra Wolfe _(EthosCE)_, and Devin Zuczek _(DLC Solutions)_.**

This case study was presented by engineers and one of the clients for EthosCE,
an LMS for publishers or professional associations who offer, among other
things, continuing medical education and reports for accreditations and grants.

EthosCE's Drupal-based platform and collects oodles of data through quizzes and
webforms. All these data need to be reported *on* by end-clients, but neither
EthosCE nor the clients can justify the expense of additional ETL products:

- On the EthosCE side, it would be expensive at scale and result in an increased
  cost to their clients.
- On the client end, most are non-profits and are very budget conscious.
  Further, "why do we have to pay more to access our own data?" is a difficult
  sell.

Drupal's database is difficult to report out of because its schema is
[normalized](https://en.wikipedia.org/wiki/Database_normalization) for integrity
of the data. Anyone who's done something that loads a multitude of entities at
once knows there's a performance penalty there. Massive aggregate reporting on
data stored this way could take down a production database.

EthosCE's team used the [Denormalizer](https://www.drupal.org/project/denormalizer)
module for D7 to:

1. "Flatten" entities back into single tables
2. Customize the structure of those tables for relevance to the reporting
   purposes
3. Do data transformation operations that would otherwise be configured in an
   ETL product.
4. Populate those resulting data into a separate database.
5. Keep that separate database up to date by running regular delta updates.

From there, clients can query those data directly or replicate them into a data
warehouse product.

### My own session

**Estimating for Iteration: Story Points and Thin Vertical Slices** <br />
[Session page](https://events.drupal.org/seattle2019/sessions/estimating-iteration-story-points-and-thin-vertical-slices)
| [My write-up]({% link _projects/2019-05-10-estimate-to-iterate.md %})

<Media type="image" size="" src="/assets/blog/drupalcon-seattle/my-pres.jpg" alt="Me giving a presentation"  />


I'm pleased with how my session went. It was scheduled for very late in the day,
so I didn't expect much of a crowd, but I was pleasantly surprised to have a big
group of people. When I first gave this session at DrupalCamp Colorado last
summer, I jumped around a bit. This time, I had better transitions and speaker
notes prepared. Next time, I need to make sure I don't look down at my computer
so much.

Resources:

- [StoryPoints.info](http://storypoints.info/)
- [What are Story Points? (Video)](https://www.tsmithcreative.com/blog/2017/what-are-story-points/)
- [What are Thin Vertical Slices? (Video)](https://www.tsmithcreative.com/blog/2017/what-are-thin-vertical-slices/)
- [Slides, Notes, and References for this presentation](https://tsmith512.github.io/estimate-with-points-and-slices/)

Thanks to DrupalCon organizers for accepting my talk!

<Media type="image" size="" src="/assets/blog/drupalcon-seattle/group-photo.jpg" alt="4K Group Photo in the Booth"  />

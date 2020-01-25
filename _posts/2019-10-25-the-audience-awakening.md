---
title: The Audience Awakening
summary: >
  A combination case study and artist statement on a small web application I
  built to power an audience participation element of St. Andrew's performance
  of Spring Awakening, directed by Rick Garcia.
tags: [development, theatre]
---

My latest bout of all-nighters turning sodas into source code took a
delightfully unusual form. I built a small web application... for audience
use... during a *live* theatre production... for a high school. To unpack:

Since 2009, I have returned each fall as an alumni/guest artist to do graphic
design for [St. Andrew's Episcopal School's](https://www.sasaustin.org/) high
school musical. The show is still directed by Rick Garcia, who was also my
director as a student. This year's show is *Spring Awakening* and Rick is up to
his usual tricks of incorporating unexpected elements to educational (and "how
the hell are we gonna pull this one off?") effect.

{% picture /blog/audence-awakening/spring-awakening-poster.jpg --alt Show Poster %}

## Theatre of the Oppressed

Theatrical artist Auguto Boal began experimenting with
"[Theatre of the Oppressed](https://en.wikipedia.org/wiki/Theatre_of_the_Oppressed)"
mechanisms in Brazil in the 70s. In his "forum theatre" exercises, actors or
audience members could pause a performance and discuss the character's situation
and work out a better choice. Other exercises took different forms, but the goal
of Boal's work was the promotion of social change through deeper audience
engagement. Rick wanted to include these kinds of concepts in the production.

## *Spring Awakening*

This show is challenging. It confronts incredibly intense issues, potentially
even more jarring for parents than for their students. When I talk to colleagues
about working a high school production of *Spring Awakening*, I hear a lot of,
"oh wow, that's a pretty adult show for kids!"

Respectfully — though I certainly cannot speak from the perspective of a parent
— I question the thinking behind that statement. This show is *written about
high schoolers, set in high school*. This is a high school cast. And though
[the musical was created in 2006](https://en.wikipedia.org/wiki/Spring_Awakening_(musical)),
it is based on a German play written in 1891. So not only are these issues
timely for a cast this age, they are also not new. Perhaps what we  mean is that
these issues are uncomfortable to talk about. But by not talking about them, our
community can slip into thinking "well that's not an issue for us; that's
something *over there*."

And yet, a friend of mine who does advocacy work in Tulsa (my second home)
shared this on Facebook yesterday, from the Oklahoma Maternal and Child Health
Service:

{% picture /blog/audence-awakening/omchs-lets-talk.jpg --alt Let's Talk Month %}

One theme of this show is the need for honest, truthful conversations between
adults and "coming of age" adolescents. One *factual* conversation about "where
babies come from" would have collapsed the central plotline.

Here's where Rick enters Theatre of the Oppressed. We are not going to re-write
*Spring Awakening* on the fly. Instead, he envisions a way we can help prove its
point. What if, around poignant scenes with important messages, we can push the
audience toward the realization that this content *is* relevant — to all of us,
right here.

## Audience Awakening: The Use Case

His premise is simple. He wants to poll the audience during scene transitions.
Display a question on the projector, a narrator reads it, audience members vote
using their phones, and the results are displayed: both how people voted — how
they *perceive* the issue — and the correct answer from statistical data about
the *truth* of the issue.

(For my gamer friends out there, transactionally speaking: he's describing
[JackBox](https://jackboxgames.com).)

I hashed out a flow diagram.

{% picture /blog/audence-awakening/flow-diagram.png --alt Application flowchart %}

An aside: the appropriateness of audience smartphone use is another major
ongoing discussion in the industry. And I love the imagery here: the stereotype
of teenagers ignoring their parents by being immersed in their phones juxtaposed
against actually encouraging parents to whip out their phones during a play.
Potentially losing some of them to distracting notifications during scenes
they'd rather ignore?

A sample scenario:

- **(MINOR SHOW SPOILER)** In the show, Martha is physically abused by her
  father, which she hides from her friends but accidentally reveals. She *begs*
  them not to tell anyone because she doesn't want to "end up like Ilse," whose
  parents kicked her out of the house.
- As the scene ends, the projector illuminates:
- *True or False: In 2018, Child Protective Service removed over 16,000 Texas
  children from their homes as a result of abuse or neglect.*
- Audience votes. Votes are tabulated silently on the next screen. Then the answer:
- *True. In 2018, CPS removed 16,221 children as a result of abuse or neglect.*

## Product Requirements

As seen in the flow diagram, the concepts aren't complicated. However, our
artistic team had specific requirements. We could not find an existing product
to use because:

- We wanted to customize the look of all displays.
- Traffic had to be lightweight enough to avoid network congestion preventing
  people from participating.
- From my professional experience, I know that users are disinclined to go
  download an app from their app stores without a significant return on that
  investment.
- The user experience needed to feel welcoming and streamlined enough that an
  age-diverse audience would actually participate through multiple rounds.
- The results needed to be displayable on the theatrical projector (via qLab or
  Isadora integration) and/or unattended computer treating the projector as a
  monitor.
- The stage manager needed to be able to control every transition of the
  application easily, potentially jump out of order.

## Audience Awakening: The Web App

In 2013, I built a [little game](https://tsmith512.github.io/scrummy/) as an
experiment in "I wonder what this 'Node' thing is." It used
[Express](https://expressjs.com/) and [Socket.io](https://socket.io/) on
[Node 0.10](https://nodejs.org/en/). That pattern is rudimentary compared to
today's more popular frameworks, but those tools are still maintained and much
more mature now. And again, this was ultimately a simple application. For lack
of time, I started there and tried to write cleaner code this time, even if a
lot of the frontend still boils down to direct DOM manipulation. I got a
prototype working in just a couple of hours.

{% picture /blog/audence-awakening/voting-in-rehearsal.jpg --alt Showing the vote screen in front of the stage %}

I spent the next week making functional adjustments in conjunction with the
student stage manager and student assistant director. I also matched the
application's simple theming to my publicity graphics, the scenic designer's
vision, the lighting designer's use of the cyc (a white backdrop that doubled as
the projection surface), and the limitations of how the projector was
configured.

[Audience Awakening code repo on GitHub](https://github.com/tsmith512/audience-awakening)

### Supported "Personas"

As implied in the flow diagram, the application serves three types of clients,
each with their own display, plus an additional display for testing.

**Participants:** A very simple mobile-optimized display that shows the show
logo, basic instructions, questions, buttons for voting, answers for the
audience, and design elements from the set.

{% picture /blog/audence-awakening/participant.jpg --alt Participant with phone in her lap %}

**Presenters:** The read-only/unattended display used on the projector. It
shows questions, answers, and the distribution of the results.

{% picture /blog/audence-awakening/presenters.jpg --alt Photo of a laptop and projector backstage %}

We had every intention of using the primary long-throw projector from the booth,
but given how the scenic design worked, putting this in the passthrough behind
the orchestra was surprisingly better. And it looks ridiculous, very theatre.

**Admins:** This is the stage manager's console to advance through the stages of
the application.

{% picture /blog/audence-awakening/admins.jpg --alt Screenshot of the admin display %}

**Debuggers:** A testing mode just for me. It shows the three other displays
side-by-side and buttons to force an all-client reload, pull a game state
data-dump, or add votes for testing. And because all Admin interactions run
through Socket, I can watch the SM manipulate the system from this screen while
it happens — his display syncs up with this.

{% picture /blog/audence-awakening/debug-assembly.jpg --alt Screenshot of the debug display showing multiple connections %}

The 250 connections demo shown here was during an impromptu demo in an
all-school assembly. Rick gave me five minutes' notice on that one. But it
worked! 🎉

{% picture /blog/audence-awakening/heroku-metrics.jpg --alt Heroku's metrics %}

As anticipated, Heroku's metrics dashboard confirmed that even the smallest
Standard Dyno was well beyond what I needed. Which is to say: yes, it's hosted
on Heroku with automatic deploys from GitHub. That and the debugger's reload
button made it easy to update code live during rehearsals and push application
updates to other consoles.

{% picture /blog/audence-awakening/open-dress.jpg --alt Poll open during an open final dress rehearsal %}

*Preview night / open final dress rehearsal. A few audience members are voting.*

I always love the opportunity to find new intersections for all my hobbies. The
magic of creating theatre comes out in labors of love, long nights, and taking
things you know and applying them in new ways every time. This was a simple
technical and design execution — this application only serves to help reinforce
a point that the show creates, but I like its place in the message. I'm super
grateful for yet another journey with the SAS team through a great show.

{% picture /blog/audence-awakening/debug-postshow.jpg --alt Postshow screen on debugger %}

*Spring Awakening was performed with special permission from Music Theatre International.*

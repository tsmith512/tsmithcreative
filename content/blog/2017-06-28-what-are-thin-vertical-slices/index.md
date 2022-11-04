---
title: What are Thin Vertical Slices? [Video]
summary: >
  Framing development efforts as thin vertical slices using user stories ensures
  a quickly releasable product, maximized value to the stakeholders, and a
  workflow that is adaptable to many kinds of change.
layout: post
tags: [scrum, presentation]
---

<iframe src="https://player.vimeo.com/video/223554794" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen><p><a href="https://vimeo.com/223554794">What are Thin Vertical Slices</a> from <a href="https://vimeo.com/tsmith512">Taylor Smith</a> on <a href="https://vimeo.com">Vimeo</a>.</p></iframe>

Framing work in thin vertical slices of functionality means focusing on the
business need behind feature requests instead of stratifying efforts by layer
of the application. When development of a particular ticket is complete, the
user identified in the ticket or user story should be able to accomplish his or
her goal as supported by any backend and frontend development needed.

{{< collapsed "Transcript" >}}
Good evenin' folks!

### Introduction

We've had a lot of internal chatter about "thin vertical slices" lately and I
want to talk about why we break down projects in this way. We all know that it's
easier to attack a smaller bit of work than to try and tackle a giant effort at
once, but this is more about how we structure a to-do list than the idea that we
need one.

First, we take big projects and break them down into "epics"---large features
that the client specifically called out, things that we've intuited from the
situation, or even groundwork buckets like DevOps or application framework that
we know we need to do. But epics aren't actionable pieces of work: we further
break down epics into individual tickets, usually with user stories.

### User Stories

Textbook Scrum doesn't actually require framing development tickets as user
stories, but we do because it enforces thinking about the business need each
solves and what a particular user will be able to accomplish when it is
complete.

Thinking back to my last video on story points, our goal is to break features
down until we have tickets that describe individual business requirements with
an understandable level of complexity that can be built out quickly and
iteratively.

`AS A ___ I WANT TO ___ SO THAT I CAN ___.`

> As a cyclist, I want to be able to stop the bike so that I don't get hurt.

Brakes are complicated and can take different mechanical approaches, but _what_
we're trying to _give_ the cyclist is simple. Similarly, each dev ticket
describes a single need, and while there may be many development steps to meet
it, we don't stuff them with multiple features.

> As a customer, I would like to create an account during check-out so that I
> can see a dashboard with all my past orders.

If you see a story like that, your Product Owner was asleep. There's a lot of
stuff implied there. What if we start something like this, which builds on
existing simple eCommerce system.

> As a customer, I would like to save my contact information so I don't have to
> enter it on each order.

That describes what the user actually wants out of having an account, and also
limits scope to what an account is going to start out as: a shortcut of filling
out all the contact info, _for example._ The backlog might have a lot more
expansion of user accounts, but this was deemed the top priority to get that
epic started and the need described is simple. Adding a list of past orders,
saving items for later, and saving payment options, can come in future stories.

### Thin _Vertical_ Slices

So we've got "thin slices" of user requirement here, but what makes them "thin
_vertical_ slices?" It's useful for a PO to sit down with the tech lead or
architect to write out a "How to Demo" list of steps a user would need to go
through to "do" the task. When development is complete, the user persona
identified in the story should be able to accomplish the goal by following the
steps, as supported by any backend and frontend development needed. Depending on
the platform, there might be more vertical components there: databasing,
application models and controllers, themed components, etc. Everything needed to
support that customer being able to do those steps and reach his or her goal---
being able to reuse their contact information on orders---is built as part of
that ticket.

### Why does this matter?

It's not always comfortable to develop this way, but it results in cost savings
and adaptability. Around here, we often use cooking or home building in
analogies for project management, but those don't always encourage vertical
thinking. Thin vertical slices is like a slice of cake, not a layer in a cake.
It's a finished out room, not hanging drywall for a whole house.

Working this way allows us to always have a releasable product and build
iteratively, both of which help us adapt to changes in requirements, timeline,
or budget. In our example case, maybe that's all we've added to the platform:
the ability to save your contact information. Can't do anything else with an
account. But it's new, it was identified as valuable, and it was delivered
quickly. If the client suddenly changes their mind about what they want next,
that's fine. If the client runs out of money suddenly, we can part ways and
they've received everything they paid for and it is all usable.

So that's my primer on thin vertical slices. But a question came up lately that
challenged my idea of why this is valueable, but eventually brought me back to
where I'd started.

### Can we break up frontend and backend?

Lately, one of my teams asked to split up stories into separate frontend and
backend tickets. Although this goes against pure Scrum methodology, let's talk
about the pros and cons of that, because I'd rather the process support the
needs of the project than just be something that we "do" because I said so.

Among the benefits to splitting tickets up:

- Keeps people working in their preferred focus and teammembers can work ahead
  on upcoming features. Backend or frontend can lay the groundwork for stuff
  coming up.
- If timeline is more flexible than budget, it could indicate when to ramp down
  people who might otherwise go underutilized.
- It can help give individuals a sense of accomplishment: "I did my part." I
  checked that box.

On the other hand:

- If one "team" or the other gets way out in front, you've got a lot of billed
  work that can't be used (yet). Backend bits not accessible through the UI, or
  a library of themed components that aren't driven by anything.
- It allows people to silo themselves.
- It could even contribute to individuals trying to check off their "technical"
  to-do items over a focus on working as a team to produce a product that solves
  a business problem for stakeholders.

Ultimately, what did we commit to? In a traditional scrum sprint, the whole team
commits to completing a box of work in a set period of time. If we acknowledge
that the stories were ordered based on their priority by the stakeholders, then
completing the sprint means completing what's in it. Finishing 75% of the sprint
stories and putting either a frontend or a backend on a bunch of stuff that
doesn't get completed still means the client only receives the value of the 75%
of the sprint that got built.

This does mean sometimes asking people to step out of their comfort zones to
help reach a team goal. Maybe you've got frontend or backend people who can flex
a bit, or someone who is looking for an opportunity to learn something new? Or
you know you've got good people who can figure it out and that's what we need to
do. For example, even if one of my teammembers isn't as experienced doing
frontend work, it's often better for her to be a slower frontend developer and
contribute to the completion of the sprint than for her to work outside the
sprint on things that are a lower priority.

If, on the other hand, the client needs editorial tools first, or a content
model for migration, or there's some other driving factor where work can be
valuable to the client without being complete, maybe splitting frontend and
backend work makes sense in that case. What you have to be really careful of is
that you make sure you've got "both" tickets for every feature, and that you
watch out for how far ahead or apart your teams are working. This puts a lot of
responsibility back on everyone to do frequent estimation and backlog grooming
to make sure that the correct tickets are written and that changes are accounted
for in both places.

So I see that path as having the tendency to run into the same problems that
waterfall processes can face because it splits the team and may also reduce the
focus on "business needs". If the teams diverge, adaptability is harder. Going
back to the layer cake analogy, what if the backend layer is built and the
client suddenly deices they want a vanilla cake instead. Sure, frontend hasn't
gotten there yet, but backend has to start over.

For this particular project case, a steady stream of changes complicated our
ability to actually commit to sprints because the target was moving on a daily
basis. If we can't limit change within the sprint cycle, the commitment isn't
realistic. So we started using more "sub-tasks" in JIRA, and we also switched
over to Kanban instead of Scrum, ditching the two-week cycle and adding
"workflow columns" for backend and frontend. As we go, we're minimizing work in
progress to encourage a faster flow and releasing what's been completed whenever
the client asks us to pull that trigger. That's helped organize the effort a
little better but it still boils down to building vertically in priority order,
and still just one ticket per business need for the most part, just with a
different rhythm.

### Wrap-up

So ultimately, the friction we felt in the frontend versus backend was real, but
we were able to adjust how we used our project management tools rather than
change how we structured our backlog. Processes should be pliable enough to flex
for the project's needs, and we did jump ship from traditional scrum in favor of
wingin' it with kanban-by-short-release-phases, but with those adjustments,
retaining the notion of user-focused thin vertical slices has still been
successful.
{{< /collapsed >}}


---

## Acknowledgements of CC Content

Thank you to the generous content creators who freely offered their music used
in this project.

### Music

- _Title:_ Point of View<br />
  _Artist:_ Nicolai Heidlas<br />
  [https://soundcloud.com/nicolai-heidlas/inspirational-background-music-point-of-view](https://soundcloud.com/nicolai-heidlas/inspirational-background-music-point-of-view)

- _Title:_ Chase Your Dreams<br />
  _Artist:_ Nicolai Heidlas<br />
  [https://soundcloud.com/nicolai-heidlas/motivational-background-music-chase-your-dreams](https://soundcloud.com/nicolai-heidlas/motivational-background-music-chase-your-dreams)

- _Title:_ On and On<br />
  _Artist:_ Nicolai Heidlas<br />
  [https://soundcloud.com/nicolai-heidlas/90-bpm-on-and-on-upbeat-instrumental-pop-background-music](https://soundcloud.com/nicolai-heidlas/90-bpm-on-and-on-upbeat-instrumental-pop-background-music)

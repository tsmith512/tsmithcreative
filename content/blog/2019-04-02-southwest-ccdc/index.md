---
title: "SWCCDC 2019: Adventures in Project Management and Paleontology"
summary: >
  Wherein I helped out with a collegiate cybersecurity competition as a project
  manager, stage manager, and creative memo writer for Triassic Park.
tags: [event, product management, education]
---

Two weeks ago, I volunteered for the
[Southwest Regional Collegiate Cyber Defense Competition](https://southwestccdc.com/)
(CCDC) at The University of Tulsa. At a high level, CCDC is a competition for
college teams to form mock IT organizations (a "Blue Team") for a fictional
enterprise-scale company.

{{< media type="image" size="" src="comms.jpg" alt="Communications closet patching"  >}}

_Photo by Kate V._

They must take over the network they were given, repair/rebuild it as necessary,
secure it, maintain business critical services (which are scored for points),
and respond to various real-world challenges/requests — called "injects."
Meanwhile, information security _professionals_ ("Red Team") try to exfiltrate
sensitive data and gain control over internal systems. Points are awarded for
keeping scored services online and responding appropriately to injects. Points
are lost when Red Team accomplishes an objective, but half of those points can
be regained by identifying and formally reporting on the incident. Finally, for
critical services under SLA, points are lost for extended outages.

{{< media type="image" size="" src="buildlab.jpg" alt="The Build Lab"  >}}

_Build Lab — Brady imaging computers the night before the game. Ten years ago, I
took "Business & Society" in this room. My only class ever in what was then
called the "Business Administration Hall (BAH)"._

For as serious as all of this sounds, some comic relief: the scenario this year
was, in essence, _Jurassic Park_. Blue Team was flown in as an emergency relief
team after **"Triassic Park"** had to be evacuated following a severe storm. It
was lightly implied that the previous IT team may have been eaten by dinosaurs.
Relatedly, aside from the suite of typical services (website, email, active
directory, etc.), game organizers built a custom "electric fence control"
simulated service that required a lot of maintenance. If a team's electric
fences went down, not only would they start losing points because of the
critical SLA on the fence, but also the dinosaurs would escape and attack the
team room!

{{< media type="image" size="" src="dinosaurs.jpg" alt="Organizers in dinosaur costumes"  >}}

I was brought on board to project manage injects, assist in writing and grading
them, and to "stage manage" their execution during the game. I also threw
together the park's little website and maintained a list of users that we could
use as in-game characters so that teams had "real" users with real accounts and
verifiable identities.

## Drafting Injects: Educational Objectives as User Stories

As a Product Owner, when I consult with clients, I don't want them to dump
technical requirements onto my team — we want to know what drives their work so
we can work toward delivering on goals.

That felt like what we did for the game — both the injects and the network
operations teams structured our work around educational objectives. What skills
do we want to test students on or encourage them to learn? The theme for this
year was automation, so many of our injects encouraged students to automate
routine tasks, whether explicitly ("Automate the electric fence maintenance") or
implicitly ("Provision 75 new user accounts").

Conversely, I'm usually on the watch for unnecessary technical complexity
because that is often a sign of scope creep. But in this instance, complexity
was occasionally part of that objective. Professionals often inherit
over-engineered solutions or have to tame systems that were built on shifting
requirements over years.

{{< media type="image" size="" src="facepalm.jpg" alt="Facepalm"  >}}

_Photo by Kate V. — Not entirely sure what precipitated this, could be anything._

Next, we determined what the "answer" needed to be. From "What do you need to
learn?" to "What do you need to do/create to demonstrate that?"

An example, "Map a Network Drive"

- Learning objectives:
  - This is a very common administration task
  - This should be executed through a Domain Group Policy configuration; GPO is a
    critical skill for management of a corporate IT environment.
- Success criteria:
  - The share should be mounted when the user logs in...
  - ...with proper permissions and only for the correct users.
  - Blue Team should respond professionally to the request...
  - ...in a manner that is tailored to the audience it came from.

Finally, "who is asking for this?" I edited technical injects using the CIO's
technical voice. I used the CEO's more goals-oriented voice for policy/business
injects. This particular example is an ideal request to come from outside IT —
Ellie Sattler (the botanist from the movie) made this request because it
directly enables a workflow goal for her.

> Good afternoon!
>
> We have some medical reports that we use frequently. Unfortunately, it's quite
> difficult to access on the network share. We currently access them by browsing
> to a directory called "medical-records" on \\\\spike\\ but it is buried in a
> ton of other stuff [...] I can never remember where it is and it takes a long
> time for me to locate a file using Search over the park's wifi. Can you please
> create a share that's easier for Medical department users team to get to? Can
> it show up as drive letter M: or something, automatically when we login to our
> machines?
>
> Thanks,
> Ellie

Clearly, there's a little hinting here. An end-user would likely not have
specified a network drive mount-point, nor thought to specify that it happen
automatically. But it's important that inject text also have enough direction so
that students can envision success quickly and start work. Others were more
open-ended.

## Managing Distributed Writing

We used Google Forms for brainstorming collection, Jira tickets per inject with
subtasks for each component to draft, and compiled living documentation in
Confluence to finalize injects into spec sheets. Once gathered in Tulsa, we
storyboarded the injects to balance cadence.

Compiled index in Confluence:

{{< media type="image" size="" src="confluence.jpg" alt="An index in confluence"  >}}

Storyboarding:

{{< media type="image" size="" src="timeline.jpg" alt="The timeline post-up on a whiteboard"  >}}

Calendar for easy visualization:

{{< media type="image" size="" src="calendar.jpg" alt="Google Calendar screenshot displaying all injects"  >}}

It was an incredibly busy day for Blue Teams. And injects is just part of it.

{{< media type="image" size="" src="inject-grading.jpg" alt="Grading injects"  >}}

_Photo by Kate V. — Austin and Brady grading an inject in person._

## Real-world Encounters

My team of in-game characters, the "Purple Team," also paid visits to team rooms
to present legitimate opportunities for interactions between Blue Teams and
typical user requests. These were lighter weight than regular injects, but were
still based around the same framework of "what do we want teams to learn?" For
example:

- Mike the CFO asked for administrative level access to his computer.
  - Teams should respond professionally with policy-based reasoning, but the
    right answer is here is "no you can't," and learning how to tell someone so
    senior "no" is a very difficult but important lesson.
  - Multiple teams went where I was hoping to see them go by redirecting the
    conversation, "Is there something I can install for you" or some other "how
    can we work on the root issue" alternative.
  - No one gave Mike admin access to his machine! Good work!
- Blake the Engineer asked for a legitimate application to be installed.
  - Again, professionalism; the right answer was "yes" this time.
  - Teams needed to validate Blake's identity and then install the application
    on the workstation he indicated.

Purple Team'ers that I dispatched had names from my Master User List that were
real accounts in Active Directory. Blue Team should have confirmed their
identities in AD before doing anything except answering generic questions. Some
Red Team folks were running around with purple badges without names on them and
made requests, too — some of which resulted in security breaches.

---

## Fun War Stories

### The Overnight Complication

Apparently, it's CCDC tradition for a recoverable but significant catastrophe to
happen overnight. We hinted with an inject "Create a Disaster Recovery Plan"
late on Day 1 and then distributed a fake weather report shortly thereafter.
That night, their rooms "flooded."

{{< media type="image" size="" src="flooded.jpg" alt="Ethernet cables pulled and piled in a corner"  >}}

We pulled all the ethernet cables and piled them in the corner. I worried about
this one. It wasn't just a matter of "plug computers into the switch" — multiple
ports had VLAN tagging and some teams had redesigned their network. Knowing
*which* port was critical. This would be easy for a team that had created a good
Layer 1 diagram. But it could be a deal breaker for teams who didn't. The next
morning, I was deeply impressed — most teams were back up within fifteen
minutes.

### CEwho?

One inject tested Blue Teams' prowess at AD automation — create 75 new user
accounts. This list of names was auto-generated. Red Team exfiltrated *that*
list on one team's workstation and mistakenly thought it was my Master User List
of existing accounts. With names they *thought* were real, they produced a
letter from the CEO demanding cooperation with "system audits" that Red Team
hoped to surreptitiously perform. Unfortunately, because they had the wrong
list, they used the wrong name for the CEO. The very first team they attempted
to "audit" noticed this discrepancy and sent Red Team packing.

### An Expensive Website

Two teams' websites were down near the end of Day 2. The website is a scored
service, so they weren't racking up points while the park didn't have a
marketing site. I had a backup of the site I built, so game directors added it
to the "store" that teams could buy things from using in-game currency.
Unfortunately, the price was outside their budget. Therefore, both teams had to
negotiate for "emergency funding" from the CEO, another one of our actors.
That's a legitimate exercise as well — "something bad happened and recovery is
going to cost more than we thought." In order to approve 10,000 Gamebucks to
"re-hire the web developer" (or: get a link to my backup) the CEO ultimately
made them sing and dance to *I'm a Little Teapot.* It was glorious. Serious
props to everyone who rose to that occasion.

---


{{< media type="image" size="" src="retro-panel.jpg" alt="Retro panel of game organizers"  >}}

_Photo by Kate V. — Organizers speak to students post-game._


# Congratulations

Overall, I was astonished by not only the students' level of technical prowess
but also the professionalism and grace under pressure on display all weekend
from each of them. Also, the rest of the game organizers and volunteers are
super sharp, were a joy to work with, and I learned so much from them in these
few days. Thank you for this experience!

{{< media type="image" size="" src="elevator.jpg" alt="Velociraptor waiting for the elevator"  >}}

_Photo by Kate V._

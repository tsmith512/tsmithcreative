---
title: "My First Week with Notion for Notes and Project Management"
summary: >
  I think I've finally found the notes application I've been looking for, and
  it's got a built-in project management suite.
tags: [review, management]
---

I noticed an article from _The Verge_ the other day about a product called
[Notion][N], "[Notion brings its powerful note-taking app to Android][VERGE]"
and a preview image that caught my eye. You see:

- I've used [OneNote][ON] on and off since 2004 and I love it, but while I
  appreciate the "notebook" structure, freeform pages, and especially the
  handwriting, sometimes it can be a little too loosey goosey.
- I never really cared for [Evernote][EV]'s simultaneous feature bloat and
  limitations on content.
- I mostly use [Google Keep][GK] to help me remember where I parked at the airport.
  It's a great bulletin board, but it doesn't feel like an organizational
  solution for a large volume of content.

![Sample 'today' page in Notion](/assets/blog/notion/today-noshadow.png)

_(Image lifted from [Notion.so's product page][NP], and also the same image The
Verge used that caught my attention.)_

But I've never felt like I'd found a good note taking app _for me_ because I
need help not just with archiving my brain, but organizing the things I'm doing.
So I've also been an avid Todoist user for years (with Premium) and it's great
for _tasks_, but "projects" are just groups of tasks. It's not a reference tool
and it's not trying to be one — though users can comment on individual to-do
items, which is useful. It's perfect for all the many things it does, wouldn't
change it.

## [Notion][N] is different

More flexible content entry than Evernote, more structured than OneNote, more featured than Keep, more reference-oriented than Todoist, has a flexible content model that intrigues my inner  developer, and can it therefore throw pages up on a Kanban board or Calendar. It's a weird balance, not without its quirks, but I have moved in _hastily_.

## Awesome features

**Pages are built out with blocks of content.** Blocks can be plain text, bullet
lists, checkbox/to-do lists, headers, images, links with preview, embeds from
various services, and more.

<p class="media">
  <video src="/assets/blog/notion/blocks.gif.mp4" autoplay loop muted width="960">
  <img src="/assets/blog/notion/blocks.gif" alt="Blocks options for new content" />
  </video>
</p>

**Text formatting is flexible enough to organize, but still structured.** It's
not a "full WYSIWYG" editor like OneNote, and I like that. By giving me the
tools to express ideas without turning editing into a free-for-all helps me feel
like I'm making progress instead of making a mess. Hotkeys and Markdown-style
editing makes it even faster.

  ![Formatting text in Notion](/assets/blog/notion/formatting.gif)

**Pages can have "databases" which are better than simple tables.** A database
can be viewed as a table, Kanban board, or calendar. Entries in these databases
are themselves pages, but inherit a customizable data model allowing you to add
custom properties to visualize in the table/board/calendar outputs.

<p class="media">
  <video src="/assets/blog/notion/database.gif.mp4" autoplay loop muted>
  <img src="/assets/blog/notion/database.gif" alt="Database viewed as a Kanban board" />
  </video>
</p>

**Content can be put into columns.** Taking notes in planning meetings often
means annotating images. While OneNote clearly wins with handwriting-on-canvas,
Notion's ability to group content with columns really helps keep bits of text
and reference material with images or other content. (In truth, OneNote does do
columns — you can put text frames next to each other — but it can get messy.)

<p class="media">
  <video src="/assets/blog/notion/columns.gif.mp4" autoplay loop muted>
  <img src="/assets/blog/notion/columns.gif" alt="Creating columns in Notion's editor" />
  </video>
</p>

**Lightweight interface.** Despite all it can do, its interface is surprisingly
spartan and very content-focused. This reduces distractions and helps keep me on
task.

![The application interface is sparse](/assets/blog/notion/interface.png)

**Android app!** I would not dive into a note taking application that didn't let
me collect information from my phone. The Android application makes accessing
all these features delightfully easy, and content is displayed responsively!
Unlike OneNote, where — though you can access a full page with drawing — you
have to do a lot of pinch-to-zoom on pages that have more than a single text
frame.

**Sharing, either a single page or a branch of pages.** This is a problem I
always had with OneNote — there's not a good way to share a single page. You can
get a public link for any page and its descendants so that guests can read or
comment. I'm always experimenting with something and I'm an occasional
freelancer, so this is going to be great for projects. For companies and teams,
I don't know how granular sharing is for Workspaces (guess I'll have to get
[Four Kitchens][FK] on board!).

## How I used [Notion][N] this week

**Planning travel:** By creating a "database" page, I can see upcoming trips
both in a table and on a calendar. Each trip is both a "row" in the database and
also a page on its own.

![My Travel Plans page](/assets/blog/notion/travel-plans.png)

**Researching:** Collecting graphic design research for a theatrical production
this fall, I uploaded pages and added links to things I saw. Then I reviewed
them with the director.

<p class="media">
  <video src="/assets/blog/notion/research.gif.mp4" autoplay loop muted>
  <img src="/assets/blog/notion/research.gif" alt="A research page" />
  </video>
</p>

**Project management:** For that same production, I'll be creating multiple
pieces. Using another "database" page, I have created a row for each piece
needed (to collect draft images and requirements). I set up all three view
styles for the database:
- a table for an overview,
- a Kanban board so I can track progress as I work, and
- a calendar to visualize the review and delivery dates.

![A kanban board of project tasks](/assets/blog/notion/pm.png)

**Simple writing:** I drafted this blog post and a conference presentation
proposal in Notion. With its easy export to Markdown, I'll be able to drop them
right into my site repo.

  ![A blog post draft in Notion](/assets/blog/notion/draft.png)

## What Notion is Not

- **A "todo list" application** like Todoist. Though Notion may take issue with
  this stance because it can be used to _make_ to-do lists within a page, but
  it's basic.
  - At their cores, Todoist is a set of organized, _dated_ tasks; Notion is a
    notebook of pages or collection of "databases" which you can
    _write dates on_. Within a database, you _can_ make a to-do list, but:
  - Notion doesn't have a way to show you a list of "every dated item whose date
    is today/soon/overdue across all pages/databases."
  - Notion does have a way to set a reminder by adding a date/time inline on a
    page, but I couldn't make that work reliably, and again there's no report.
    It's definitely not the solid time- or location-based reminders that Todoist
    offers.
- **A native application.** It's yet another Electron app, but of Electron apps
  clamoring for system resources, it is much lighter than I expected. And that
  did mean they could go cross-platform quickly, which is great.
- **A platform with integrations.** Though you can print individual pages,
  export them to Markdown, or export an entire tree of pages to Markdown,
  there's not an ecosystem of inbound and outbound integrations like you get
  with OneNote/Evernote/Todoist. I would love to see a bulk PDF export, or a
  more organized MD export archive. I'd also love to see easy collectors like
  "email to Notion." Further, the Android app does not surface an intent to
  receive "Shares" from other apps; i.e. you have to add photos and content from
  the app, not "Sharing" _to_ Notion from elsewhere on the device.
- **Tag based.** This wasn't a deal breaker for me because thanks to years of
  OneNote and a lot of local working files, I'm a very "put stuff in its place
  and come back to it later" person: the notebook and hierarchical, ordered page
  structure is _perfect_ for me. People who like Evernote's encouraged system of
  "use a limited hierarchy of date-ordered pages and tag 'em" will have more
  trouble.
- **Local storage.** The biggest critique I've heard of the latest release of
  OneNote is that it forces users to use OneDrive and there's essentially no
  local copy aside from the cache in a user's `AppData` folder. Although OneNote
  and Notion are both very offline-capable (which I have yet to test), I do miss
  programs that store their data locally. I worry about not having good backups
  of this valuable data: the bulk Markdown export isn't very organized — the
  hierarchy exports to a single directory with files whose names are prefixed
  with a hash. Links between those files exist in the Markdown, but "recovery"
  from such an archive, or moving it to a new system, would be difficult.

## OMG I've found what I was looking for!

I'm incredibly excited about this product. In just over a week, I've started
using it in many different ways and it seems to have a good answer to just about
anything I throw at it. I look forward to seeing where Notion takes this
platform, but as it stands, it has many features I've been looking for in my
years-long quest to find _"the"_ notes application for me (and a few I didn't
expect to find). I'll definitely still use Todoist for to-dos, but in
combination together I think I finally have a winning pair of applications for
productivity and reference.

[N]: https://notion.so
[VERGE]: https://www.theverge.com/2018/6/7/17434754/notion-android-app-notes-productivity-review
[ON]: https://products.office.com/en-US/onenote
[EV]: https://www.evernote.com
[GK]: https://www.google.com/keep/
[NP]: https://www.notion.so/product
[FK]: https://www.fourkitchens.com

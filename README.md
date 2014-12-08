# Home Page as configuration, not a one-off content type

Have you ever created a content/node type called "Home Page," of which you plan
to only have one, and use that as the home page on your latest project? That
feels a bit dirty, doesn't it?

_There are some use-cases where a node type called "Home Pages" might be great,
if you plan to have many of them built, which you can then switch between. I've
seen news sites that do this, and it works well in that application._

But why define a whole "content type" if you're only going to have one?

**[[ CARIS: Is there a generally accepted definition for content type? ]]**

Using a combination of Panels and custom administration forms, it is possible to
create extremely flexible home page experiences that can even respond to
context.

## Using Panels for the home page

Really, this approach could be as simple as just not using `node` for the home
page, but Panels provides a blank canvas onto which we can add custom Ctools
content types (i.e. "custom panes," because of course Ctools has to use the
phrase "content types" to mean something completely different).

## Using an admin form so administrators can easily change configuration options

## An example: the upcoming Texas Exes home page

The Texas Exes, the official alumni association for The University of Texas at
Austin, wanted a home page that could respond to a user's organizational role.
For example, users may be:

- Anonymous/unauthenticated
- Logged in as any of:
  - Alumnus of The University, but not a Texas Exes member
  - Member of the Texas Exes (a recurring "subscription" model which provides many benefits)
  - Life Member of the Texas Exes (having paid a one-time membership which provides certain additional benefits)
  - Leaders of their respective Chapters
  - Texas Exes employees

For maximum flexibility, a taxonomy system was created for "Home Page Audiences"
to define the content for the different variable areas.
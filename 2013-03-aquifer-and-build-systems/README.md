# Meet Aquifer: A Build System for Easier Drupal Development

## What is a build system?

Build systems simplify the development process by leveraging a single tool to
handle dependency management, automate tasks like testing, consolidate steps
to compile/deploy the product, reduce repetitive steps, and simplify onboarding.

Using a build system often leads to using an organized directory and file
structure which can be reused across projects, reinforcing best practices,
simplifying the process to ramp up new teammates, and making maintainable
choices [_(StackOverflow by haylem)_][BBTSO]. It helps debugging across
environments as well.

While build systems have been in use in software projects for decades, they're
newer for web projects. Web development used to be limited to serving static
assets (HTML, CSS, JS, and images). From there, the industry started having the
server execute pieces of the source files to adjust the output dynamically
(SHTML, Perl, or PHP) to do things like add modification dates, include reusable
snippets, etc. But over the years, this "dynamic content" gave rise to full CMS-
based websites. The change may have happened gradually, but these really are
full applications now. They should be managed as such, especially enterprise
sites or sites with large/revolving development teams.

## We use Aquifer as a build system for Drupal.

> Aquifer is a command line interface that makes it easy to scaffold, build,
> test, and deploy your Drupal websites. It provides a default set of tools that
> allow you to develop, and build Drupal sites using the Drush-make workflow. In
> addition, Aquifer ships with an extensions system that allows you to add
> additional tools to your project.
> 
> - [Aquifer.io][AQ]

At Four Kitchens, we saw several pain points in developing and maintain large
Drupal sites which boiled down to not having a build system, particularly around
ramping up new developers on projects quickly. We wanted to streamline this
process, but discovered that in the Drupal world, there are few boilerplates or
shell scripts that supported a [Drush make][DM] workflow. None were
cross-compatible. So [Patrick Coffey][PCGH] started the [Aquifer][AQ] project,
supported by [many other Web Chefs][AQC].

Aquifer is now running on all Drupal 7 and Drupal 8 new builds at Four Kitchens,
supporting dozens on Web Chefs, contractors, and client-side developers.

## Business Value

On my current project, I'm the Product Owner. This means that in addition to
managing requirements, being the client's advocate, and planning releases, I am
also the steward of the client's money. Anything that can be made "easier" or
"faster" equates to more functionality for the money spent, and fewer billables
overall.

Aside from the technical benefits below, having a build system generally, and
using Aquifer specifically, has benefited this and other projects around Four
Kitchens in the following ways:

- Fewer manual steps for creating or updating a development instance allows
  teammembers to onboard faster and helps them switch between branches without
  regressions.
- Consistent code quality makes code reviews easier with a higher rate of
  acceptance on the first pass.
- Eliminating core and contrib code makes code reviews faster and highlights
  patched code for extra scrutiny if that is a necessity.
- Each of the following pain-points grows as the project gets older or bigger,
  challenging a site's overall maintainability.

## Drupal Development Pain Points Solved

### Core and Contrib Code in the Repo

**Old way:** Using [git][GIT] or another distributed source control system
[is essential][SRG], but most Drupal sites are constructed by including Drupal's
core and all contributed modules and themes in the repository. This makes a huge
repo full of code you didn't write and aren't responsible for. Then you have to
sort through that when you review PRs.

**New way:** Build systems would call core and contrib "dependencies." A build
system fetches dependencies as needed. Aquifer leverages [Drush Make][DM] to
download the specified versions of core and contrib modules on each `build`.
This keeps your repo lean, free of code outside your project.

### Managing Updates

**Old way:** Use Drush (or download) updates to modules and/or core as needed,
then commit it all as a giant changeset (or, if you're crazy like me, spend more
time spliting it up).

**New way:** Adjust the `drush.make` file as needed with the newest or preferred
version of the module you're using; then `build` and deploy. This makes changes
very visible, yet also quite simple:

- You can `git blame` the `drush.make` file to figure out exactly when which
  components were updated and by whom.
- Sometimes you don't want to update a module unless it's a security release. In
  the "old way," you'd either need to remember to reset that module's directory
  pre-commit or fiddle with locking the module version in the Update config.
  This way, update what you want and don't update what you don't want to.

Fear not, the Drupal Update module will still offer notifications as usual.

### Managing Patches

In the course of Drupal development, you will likely one day need to alter a
contrib or core file. Doing so in an organized and responsible way is the key to
maintainability (aka "not breaking your site").

**Old way:** Get the patch from D.o, apply it _and_ add the patch to the repo
(preferably in a separate directory so it isn't wiped out in an update), and
commit it all. Then, if the patched component is ever updated, make sure you
didn't lose track of the patch, apply it again (hoping it applies cleanly), and
commit. If you're not using a patch from D.o but instead writing code yourself,
you need to make sure you're making patches and applying them this way! There is
no system in place to ensure developers actually do this but code reviews.

**New way:** You cannot directly edit core or contrib code, because it will be
downloaded anew on each `build`. Instead, Aquifer will apply all patches in the
patches directory during build. This way you will:

- Never have confusion about whether a patch was applied or not.
- Never have any untracked modification of a contrib or core file which would be
  wiped out in an update.
- Be notified easily if a patch doesn't apply following an update.
- Everyone on the team can easily see what has been patched and how.

### The Refresh: Avoiding Database Config, Keeping Database Sync'd to Code

We all know not to do development or site building work on production. But
Drupal's database does hold overrides that can occasionally sneak in. If your
local database doesn't match the code you've checked out, you may not see bugs
or regressions until they clash with config in production. Also, there's no way
to review those overrides in a disciplined way.

**Old way:** Check out the code you're working on. Copy down the Production
database or a backup. Run something like `drush features-revert-all` (`fra`) and
`drush cache-clear all` (`cc all`) multiple times, then an `updb` and assume all
overrides are cleared, all changes in the code have been applied, and any new
update hooks have executed. Then, unless you're using the [Master module][MM],
enable things like `fields_ui`, `views_ui`, `devel` and disable anything that is
production-specific.

**New way:** Check out the code you're working on. Copy down the Production
database or a backup. Run `aquifer refresh`. Get to work with confidence that
your instance is up to date with your code.

Refresh can be customized for your project, but we usually have refresh run
these steps in order:

- Rebuild registry (refreshes Drupal's autoloader cache, `drush rr`)
- Set the Master module scope to local (enable all the dev modules)
- Clear all caches
- Execute the Master scope change
- Run all update hooks
- Revert all features
- Execute a final cache clear all.

### Code Quality and Automated Testing

**Old way:** Install and separately execute additional toolchains for code
linting and automated testing.

**New way:** [Aquifer Coder][AQCDR] can run lint all PHP and JavaScript in your
repo (which is only your own code) with `aquifer lint` to ensure adherence to
Drupal coding style and standards for better consistency and code sharing.

Additionally, use [Aquifer Run][AQR] to execute post-build commands to prepare
your frontend assets, execute tests, or any other repetitive tasks. In the
future, there will be dedicated Aquifer extensions for different testing
frameworks or frontend toolchains, but using Run in the meantime reduces the
number of manual steps.

## Using Aquifer for Your Projects

### How do I get started?

Check out the [Aquifer Quick-start Guide][AQQSG]. A few hints I'll add:

- We strongly recommend using [nvm][NVM] to manage your [Node.js][NJS] and
  module versions. Installing Node from Ubuntu or Homebrew packages leads to
  lots of outdated code and permissions issues, which snowball.
- Never use `sudo` for anything in this process. Aquifer uses NPM modules to
  download its extensions and prepare files to be executed by your web server,
  which may in turn save cached files in some directories. If some part of this
  process is executed with `sudo`, soon you'll have a mess of files owned by
  root, pushing you to use `sudo` more, all executing code from the Internet
  with elevated privileges, which is a major security risk. Web Chef Matt Grill
  wrote [NPM Doctor][NPMD] to help get yourself out of that spiral.

### Can I use it on a project which already exists?

Yes! Aquifer uses a Drush Make workflow, so what you need is a makefile. Drush
can generate this for you:

1. In an existing Drupal site, execute `drush make-generate drupal.make`
2. [Create a new Aquifer project][AQQSG].
3. Copy in that makefile.
4. At this point, you'll need to bring in your custom code into the
   [Aquifer directory structure][AQDS]
5. From there, `aquifer build` should generate a `build` directory that looks
   just like your existing docroot. After testing it thoroughly, you can use
   [Aquifer Git][AQG] to deploy your project to the existing repo for
   deployment.

## TL;DR:

Using a build system streamlines the development process, particularly across
multiple developers working on a single project. By reducing errors in
repetitive steps, keeping the code repository lean and well organized,
[enabling a one-step build][JTBC], ensuring high code quality, and providing a
way to prevent database conflicts with the code, [Aquifer][AQ] has become a
demonstrably valuable part of the Four Kitchens development process.

[BBTSO]: http://programmers.stackexchange.com/a/137528
[AQ]: http://aquifer.io/
[AQC]: https://github.com/aquifer/aquifer/graphs/contributors
[GIT]: https://git-scm.com/
[SRG]: http://sixrevisions.com/web-development/easy-git-tutorial/
[DM]: http://www.drush.org/en/master/make/
[MM]: https://www.drupal.org/project/master
[PCGH]: https://github.com/patrickocoffeyo
[AQCDR]: https://github.com/aquifer/aquifer-coder
[AQR]: https://github.com/aquifer/aquifer-run
[AQQSG]: http://docs.aquifer.io/sections/quickstart-guide.html
[NVM]: https://github.com/creationix/nvm
[NJS]: https://nodejs.org/
[NPMD]: https://github.com/mattgrill/NPM-Doctor
[AQDS]: http://docs.aquifer.io/sections/directory-structure.html
[AQG]: https://github.com/aquifer/aquifer-git
[JTBC]: http://www.joelonsoftware.com/articles/fog0000000043.html

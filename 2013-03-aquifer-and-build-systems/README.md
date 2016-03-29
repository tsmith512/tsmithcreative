# Aquifer and Build Systems

## What is a build system?

Build systems simplify the development process by leveraging a single tool to
handle: dependency management, automate tasks like testing, consolidating steps
to compile and deploy the product, and [????].

Using a build system often involves using an organized directory and file
structure which can be reused across projects, reinforcement of best practices,
simplifying the process to ramp up new teammates, and making maintainable choices
[_(StackOverflow by haylem)_][BBTSO].

While build systems have been in use in software projects for decades, they're
newer in the realm of web development. Web development used to be primarily
serving static assets (HTML, CSS, JS, and images). From there, the industry
started having the server execute pieces of the source files to adjust the
output (SHTML, Perl, or PHP) to do things like add modification dates, include
reused snippets, etc. But over the years, this dynamic content gave rise to full
CMS based websites. The change may have happened gradually, but these really are
full applications now. They should be managed as such, especially enterprise
sites or sites with large or revolving development teams.

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
ramping teammates and external contractors on and off of projects quickly. We
wanted to streamline this process, but discovered that in the Drupal world,
there were few boilerplates or shell scripts that supported a [Drush make][DM]
workflow, and none were cross-compatible. So [Patrick Coffey][PCGH] started the
[Aquifer][AQ] project, supported by [many other Web Chefs][AQC].

Aquifer is now running on all Drupal 7 and Drupal 8 new builds at Four Kitchens,
supporting dozens on Web Chefs, contractors, and client-side developers.

## Business Value

On my current project, I'm the Product Owner. This means that in addition to
managing requirements, being the client's advocate to our internal teams and
contractors, and planning releases, I am also partly the steward of the client's
money. Anything that can be made "easier" or "faster" equates to more
functionality for the money spent, and fewer billables overall.

Aside from the technical benefits I outline below, having a build system
generally, and using Aquifer specifically, has benefited this and other projects
around Four Kitchens in the following ways:

- Fewer manual steps for creating or updating a local development instance ramps
  teammembers up faster and helps them switch between branches without regressions.
- Consistent code quality makes code review easier with higher first-pass acceptance.
- Eliminating core and contrib code makes code reviews faster and highlights
  patched code if that is a necessity.
- Each of the following painpoints grows as the project gets older or bigger,
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
version of core or a module that you're using; then `build` and deploy. This
makes changes very visible, yet also quite simple:

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
not breaking your site.

**Old way:** Get the patch from D.o, apply it to the module (or core) _and_ add
the patch to the repo (preferably in a separate directory so it isn't wiped out
in an update), and commit it all. Then, if the patched component is ever
updated, make sure you didn't lose track of the patch, apply it again (hoping it
applies cleanly), and commit. If you're not using a patch from D.o, but you're
instead writing code yourself, you need to make sure you're making patches and
applying them this way!

**New way:** You cannot directly edit core or contrib code, because it will be
downloaded anew on each `build`. Instead, Aquifer will apply all patches in the
patches directory during build. This way you will:

- Never have confusion about whether a patch was applied or not.
- Never have any untracked modification of a contrib or core file which would be
  wiped out in an update.
- Be notified easily if a patch doesn't apply following an update.

### The Refresh: Avoiding Database Config, Keeping Database Sync'd to Code

We all know not to do development or site building work on production. But
Drupal's database does hold overrides that can occasionally sneak in. If your
local database doesn't match the code you've checked out, you may not see bugs
or regressions until they happen in production.

**Old way:** Check out the code you're working on. Pull down the Production
database or a backup. Run something like `drush features-revert-all` (`fra`) and
`drush cache-clear all` (`cc all`) multiple times, then an `updb` and assume all
overrides are cleared, all changes in the code have been applied, and any new
update hooks have executed. Then, unless you're using the [Master module][MM],
enable things like `fields_ui`, `views_ui`, `devel` and disable anything that is
production-specific.

**New way:** Check out the code you're working on. Pull down the Production
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

**MOAR**

Outline:

- DONE: Build systems kinda new to web dev
- DONE: Build systems provide lots of benefit to software development in general
- DONE: Four Kitchens has built and released Aquifer
- WIP: It does good things, including:
- DONE: Here's how I value it from a PO perspective
- How to get started
- Can I make an old project use it?


Resources:

http://blog.codinghorror.com/the-f5-key-is-not-a-build-process/

- How long does it take for you to get a new team member working productively on your project? If the answer is more than one day, you have a problem. Specifically, you don't have a proper build process in place.
- A sane software development project has automatic daily builds, performed on a neutral build server. If your team is in the habit of producing those kind of daily builds, it's difficult to accumulate the deep technical debt enumerated in all those emails. If the build server can do it, so can your newly hired coworkers.
  - Ramping up new folks

http://programmers.stackexchange.com/questions/137329/convince-a-lone-developer-to-use-a-separate-build-tool-instead-of-the-ide-one-cl

- simplifying the deployment process
- If you're building a distributable locally that means that you have to manually deploy that distributable on your production system, and implies that you probably had to do a fair bit of manual configuration on the production system to get it ready for deployment
  - (Not really applicable exactly but does speak to Features and Module dependencies)
- [Not doing this] also allows the potential for any minor configuration differences between your production platform and your development environment to cause obscure, difficult to track down errors.
  - This is a huge one
- If you structure your build scripts correctly, then you really only have to pay the cost of writing them once, and can then reuse them almost verbatim across any number of projects. There's a lot to be said in favor of having a one-line build command that builds, configures, deploys, and runs the system automatically.
  - Aquifer lint, aquifer git
- testing, safe commits, easy deployments
- This whole answer: http://programmers.stackexchange.com/a/137528
- Then, I am sure your team is going to grow.. It is even more important to have automatic test-deploy abilities done.

http://www.joelonsoftware.com/articles/fog0000000043.html

- This is good but for this application it boils down to:
  - Build in one step
  - Reducing errors from manual processes
    - PATCHES!

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

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
static assets (HTML, CSS, JS, and images). From there, the industry started
having the server execute pieces of the source files to adjust the output
(SHTML, Perl, or PHP) to do things like add modification dates, include reused
snippets, etc. But over the years, this dynamic content gave rise to full CMS
based websites. The change may have happened gradually, but these really are
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

Outline:

- Build systems kinda new to web dev
- Build systems provide lots of benefit to software development in general
- Four Kitchens has built and released Aquifer
- It does good things, including:
  - ?
- Here's how I value it from a PO perspective
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

# Gittin' Started with Pantheon Multidev

Pantheon’s new [Multidev](https://www.getpantheon.com/multidev) technology has
gotten quite a bit of
[attention](http://techcrunch.com/2013/07/10/pantheon-multidev/) lately, but why
is it a big deal?

## Rewind: How I prefer to use [Git](http://www.git-scm.com/)

Even as a solo developer, I am a
[git-flow](http://nvie.com/posts/a-successful-git-branching-model/) evangelist.
This helped me get up to speed working in teams when I joined Four Kitchens, and
satisfies my need to keep digital assets tidy. (I don’t keep much else
tidy&mdash;just ask my mother&mdash;so I reserve the right to get picky about my
code.)

My Git principles, summarized from git-flow:

- `master` (mainline, trunk, etc.) is for _stable, working, released_ code.
- Every commit to `master` should be releasable, and should be tagged as such. This way, anyone who clones master starts with a stable product.
- All development should happen on a `devel` branch.
- Features or other work which would involve multiple commits should branch off from dev, then be merged back into dev.

_See how I do this on [Scrummy’s branch view](https://github.com/tsmith512/scrummy/network).
([Scrummy](http://playscrummy.com) is a game I’m developing.)_

## Pantheon’s old way

Pantheon provides *Dev*, *Test*, and *Live* environments. This is superior to
any other host I’ve used; I’m grateful for this. My personal dealbreaker,
however: the *Development* environment sits at the branch head of `master`, not
a branch for active work.

Therefore, to test anything on a Pantheon environment, it had to be merged into
*master*. This required merging untested, incomplete, and/or unreviewed code
into master, then stumbling over others while fixing it in subsequent commits on
master. There’s a word for that: **Subversion**

I git, therefore I branch. Copiously. Pantheon now embraces this (whether you
use git-flow, or any other branching strategy).

## Enter Multidev!

As Pantheon [describes](https://www.getpantheon.com/multidev):

> Multidev saves large projects from death by a thousand local environments.
> Think of it as Google Docs for Drupal website development.

Multidev allows a full Pantheon environment to be spun up for **any branch head.**

Let that sink in.

I can have an environment on *devel* for the current sprint, on
*feature_redesign*, or for *bugfix_solr*. I can test the branch, then merge it
when the code is finished, reviewed, and releasable.

This is **exactly** what I’ve been waiting for, not merely to satisfy my
philosophical minutiae, but also because Pantheon is a very fine-tuned and
somewhat non-standard platform. Code that works on my Ubuntu box may not always
work on Pantheon. This feature eliminates that inconsistency. Pantheon's
[Josh Koenig details these benefits](https://www.getpantheon.com/blog/7-things-you-can-stop-worrying-about-multidev)
on their blog.

## How is it used?

If you use Pantheon’s git remote as your project’s only remote, you’re already set:

``` sh
# If you don't have a dev branch, create one:
git checkout -b devel

# Then push it to pantheon (use your remote name):
git push pantheon devel
```

![Git Branhes on the Multidev Pantheon Dashboard](images/gettingstartedwithmultidev-branches.png)

From the *Multidev* environment tab, select *Git Branches* and create an
environment for your new branch. Repeat this step for feature branches.

**Warning:** At the time of writing, environment names are limited to 11
characters. Keep names short, or push an alternate branch name:

``` sh
# Push a long-name branch as a new name and track it:
# local/feature-longbranchname --> pantheon/f-branch
git push pantheon -u feature-longbranchname:f-branch
```

Click *Create Environment* and select a source to clone database and files. Once
the environment is constructed, you will be directed to the *Cloud Environments*
tab:

![Running Environments on the Multidev Pantheon Dashboard](images/gettingstartedwithmultidev-environments.png)

These resulting environments are as fully-featured as the three standard
environments. Clicking the “Merge into master” button reveals the git commands
to merge (which I will expound upon here):

``` sh
# Update your local repo:
git fetch pantheon

# Switch to master (or devel, if merging a feature)
git checkout master

# Catch up with pantheon/master in any one of these ways:
git merge pantheon/master # Preferred in most cases
git rebase pantheon/master # Only if it would be wise to do so!
git reset --hard pantheon/master # Destroy local differences

# Merge your new branch
git merge --no-ff devel -m "Merge devel -> master: deploy ... ... ..."

# If you plan on tagging master, like I generally do:
git tag -a vX.Y.Z -m "Release X.Y.Z: ... ... ..."

# Push to Pantheon
git push pantheon master
```

At this time, Pantheon does not merge for you. Either way, I’d prefer merging
manually on the command-line for the added control.
([Regarding the comment about rebasing.](http://stackoverflow.com/questions/2472254/when-should-i-use-git-pull-rebase)
Useful if necessary, dicey otherwise.)

## "But we use GitHub for Pull Requests!"

Git makes managing multiple remotes easy. The key to maintaining a
GitHub-centric workflow is to push commits to both repositories. This requires
paying a little extra attention, and perhaps having one person on the team
assigned to check up on this periodically.

Unless you have a reason for keeping things separate, an easy workaround is to
[use ‘all’ as an alias for multiple remotes](http://stackoverflow.com/questions/5785549/able-to-push-to-all-git-remotes-with-the-one-command).
Users can `git push all [branch]` to push it to GitHub and Pantheon
simultaneously, which will update the PR and the environment.

When a PR is merged on GitHub, an admin can `fetch github`, merge as necessary,
and `push pantheon`.

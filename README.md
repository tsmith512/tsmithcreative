# Git Tips from TSmith

## Staying oriented: Version control information on your command prompt

Lorem ipsum

--------------------------------------------------------------------------------

## Good commits make a clean history: Commit building with interactive adding

My home is a cluttered place. (Though I insist: at least I will not permit a
mess which can grow its own messes.) My quest for tidiness takes other, more
obscure forms: maintenance of a pristine Git repository history.

Sometimes when building a large feature, it's easy to get in the weeds and write
a ton of code. This happens to me a lot when I'm making design tweaks all over
the place, or building new functionality in Drupal using Features, or working
quickly in an caffeinated state. Committing it all at once is quick, but leaves
other developers (and sometimes myself...) unable to follow my train of thought.

**Git's Interactive mode for adding hunks to the staging area makes it easy to
break down a dirty working tree into small, neat, well-documented commits.**

_Wait, is this the same thing as patch mode?_ If you're using patch mode, you're
already my kinda crazy, but this is so much cooler. Patch mode is a component of
interactive mode, and I'll explain both.

So this is a thing I have in front of me:

```
[git:txe:home-page-settings+?] taylor@webchef2:~/www/txe/sites/all/modules/features$ git status
# On branch home-page-settings
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#       modified:   ../custom/txex/txex.install
#       modified:   txex_benefit_content/txex_benefit_content.module.inc
#       modified:   txex_home_page/txex_home_page.module
#       modified:   txex_home_page/txex_home_page.pages_default.inc
#
# Untracked files:
#   (use "git add <file>..." to include in what will be committed)
#
#       txex_home_page/plugins/
#       txex_home_page/txex_home_page.module.inc
no changes added to commit (use "git add" and/or "git commit -a")
[git:txe:home-page-settings+?] taylor@webchef2:~/www/txe/sites/all/modules/features$
```

In short, we've got new files, changes in Features code on two features modules,
changes to module code... All because I banged out something I'm proud of in one
uninterrupted hour.

Let's break this down:

```
[git:txe:home-page-settings+?] taylor@webchef2:~/www/txe/sites/all/modules/features$ git add -i
           staged     unstaged path
  1:    unchanged        +7/-0 sites/all/modules/custom/txex/txex.install
  2:    unchanged        +1/-0 sites/all/modules/features/txex_benefit_content/txex_benefit_content.module.inc
  3:    unchanged        +1/-0 sites/all/modules/features/txex_home_page/txex_home_page.module
  4:    unchanged       +9/-16 sites/all/modules/features/txex_home_page/txex_home_page.pages_default.inc

*** Commands ***
  1: status       2: update       3: revert       4: add untracked
  5: patch        6: diff         7: quit         8: help
What now>
```
--------------------------------------------------------------------------------
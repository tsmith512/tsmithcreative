#!/bin/bash

name=2015-01-working-remotely
repo=git@gist.github.com:21acdbf85e78a039e5f5.git
git checkout -b $name
git submodule add $repo $name
git commit -m "Pull in $name draft as a submodule"
git remote add $name $repo
git fetch $name
git merge -s ours --no-commit $name/master
git rm --cached $name
git rm .gitmodules
rm -rf $name/.git
git add $name
git commit -m "Resolve submodule for $name"
git remote rm $name
git checkout roundup

name=2014-01-home-page-as-config
repo=git@gist.github.com:6e025ab4a5e6c6d2bbcb.git
git checkout -b $name
git submodule add $repo $name
git commit -m "Pull in $name draft as a submodule"
git remote add $name $repo
git fetch $name
git merge -s ours --no-commit $name/master
git rm --cached $name
git rm .gitmodules
rm -rf $name/.git
git add $name
git commit -m "Resolve submodule for $name"
git remote rm $name
git checkout roundup

name=2014-10-git-tips
repo=git@gist.github.com:bf6ea2de2a2228f753f5.git
git checkout -b $name
git submodule add $repo $name
git commit -m "Pull in $name draft as a submodule"
git remote add $name $repo
git fetch $name
git merge -s ours --no-commit $name/master
git rm --cached $name
git rm .gitmodules
rm -rf $name/.git
git add $name
git commit -m "Resolve submodule for $name"
git remote rm $name
git checkout roundup

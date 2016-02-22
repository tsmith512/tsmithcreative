#!/bin/bash

for directory in ../subs/*; do
  name=${directory##*/}
  git submodule add ../subs/$name $name
  git commit -m "Pull in $name article as a submodule"
  git remote add $name ../subs/$name
  git fetch $name
  git merge -s ours --no-commit $name/master
  git rm --cached $name
  git rm .gitmodules
  rm -rf $name/.git
  git add $name
  git commit -m "Resolve submodule for $name"
  git remote rm $name
done

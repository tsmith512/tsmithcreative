#!/bin/bash

set -e

echo LOAD NVM
export NVM_DIR="$HOME/.nvm"

# nvm doesn't work right with `set -e` mode
set +e
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
cd ~/repo
echo LOAD NODE VERSION
nvm use
# With nvm out of the way, go back into exit-on-error mode
set -e

if [ $(git symbolic-ref HEAD --short) = "master" ]; then
  echo On master branch: building and deploying to production
  gulp publish
else
  echo Not on master: building and deploying to staging instance
  gulp publish-staging
fi

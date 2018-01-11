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

echo GULP: BUILD/PUBLISH TO STAGING
gulp publish-staging

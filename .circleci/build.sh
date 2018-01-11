#!/bin/bash

set -e

echo DOWNLOAD NVM
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

echo LOAD NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm

cd ~/repo

echo DOWNLOAD NODE VERSION
nvm install $(cat ~/repo/.nvmrc)

echo LOAD NODE VERSION
nvm use

echo INSTALL NODE DEPENDENCIES
npm install -g gulp
npm install

echo GULP: BUILD/PUBLISH TO STAGING
gulp publish-staging

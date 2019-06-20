#!/bin/bash

set -e

echo DOWNLOAD NVM
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

echo LOAD NVM
export NVM_DIR="$HOME/.nvm"
# nvm doesn't work right with `set -e` mode
set +e
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm

cd ~/repo

echo DOWNLOAD NODE VERSION
nvm install $(cat ~/repo/.nvmrc)

echo LOAD NODE VERSION
nvm use

# With nvm out of the way, go back into exit-on-error mode
set -e

echo INSTALL NODE DEPENDENCIES
npm install -g gulp@3
npm install

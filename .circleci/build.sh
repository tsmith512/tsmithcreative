#!/bin/bash

set -ex

# Get NVM
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm

nvm install
nvm use

npm install -g gulp
npm install

gulp assets
gulp build

gulp publish-staging

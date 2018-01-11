#!/bin/bash

set -ex

# Get NVM
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm

# Enter the repo directory
cd ~/repo

# Get Node
nvm install
nvm use

# Get Node Dependencies
npm install -g gulp
npm install

# Build and deploy to the staging bucket
gulp publish-staging

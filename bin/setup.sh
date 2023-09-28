#/usr/bin/env bash

if [ -f ".env" ]; then
  set -a
  export $(grep -v '^#' .env | xargs)
  set +a
fi

mkdir -p public/fonts

curl $WEBFONTS \
  -L -H "CF-Access-Client-Id: ${R2_CLIENT}" \
  -H "CF-Access-Client-Secret: ${R2_SECRET}" \
  -o webfonts.zip

unzip -o -d public/fonts webfonts.zip

hugo

# @TODO: This may not be the best way, but make sure modules are installed for
# the functions directory
cd functions
npm install

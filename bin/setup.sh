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

# Unlike Photoswipe, the repo doesn't include a dist directory, and using the
# ESM instead of the full script reduces download a lot, so we have to do this
# in a weird way.
mkdir -p static/vendor/mermaid
curl https://registry.npmjs.org/mermaid/-/mermaid-10.6.1.tgz -o mermaid.tgz
tar -zxf mermaid.tgz -C static/vendor/mermaid

hugo

# @TODO: This may not be the best way, but make sure modules are installed for
# the functions directory
cd functions
npm install

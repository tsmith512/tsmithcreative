#/usr/bin/env bash

if [ -z "$ASSETS_FOLDER" ]; then
  echo "Assets package not specified"
  exit 1;
fi

mkdir -p _site/fonts
wget $ASSETS_FOLDER/811484.zip
unzip 811484.zip -d _site/fonts/

npm install
gem install bundler -v 1.17.3
bundle install --path vendor/bundle

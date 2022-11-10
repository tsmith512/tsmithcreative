#/usr/bin/env bash

if [ -z "$ASSETS_FOLDER" ]; then
  echo "Assets package not specified"
  exit 1;
fi

mkdir -p public/fonts
wget -N $ASSETS_FOLDER/811484.zip
unzip -o 811484.zip -d public/fonts/

hugo

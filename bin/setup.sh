#/usr/bin/env bash

if [ -z "$ASSETS_FOLDER" ]; then
  echo "Assets package not specified"
  export $(grep -v '^#' .env | xargs)
fi

mkdir -p public/fonts
wget -N $ASSETS_FOLDER/811484.zip
unzip -o 811484.zip -d public/fonts/

hugo

#!/bin/bash

while IFS=, read col1 col2 col3 col4;
do
  path="${col3//\"}"
  curl -s -o /dev/null -I -w "%{http_code} - $path\n" http://dizzy.dev/$path
done < old_drupal_aliases.csv

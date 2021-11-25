#!/bin/bash

TOP_LVL_DIR=$(pwd)

# Remove pre-exisint tar files
rm sojourn.tar.gz 

# Copy image and video assets
cp -r dist/videos src/wp_theme/
cp -r dist/images src/wp_theme/

# Update WordPress theme css
rm src/wp_theme/css/*.css
cp dist/*.css src/wp_theme/css
MAIN_CSS=$(ls dist/main.*.css | cut -d "/" -f2)
sed -i "s#css/main.*.css#css/${MAIN_CSS}#i" src/wp_theme/functions.php

# Update WordPress theme js
rm src/wp_theme/js/*.js
cp dist/*.js src/wp_theme/js
MAIN_JS=$(ls dist/main.*.js | cut -d "/" -f2)
sed -i "s#js/main.*.js#js/${MAIN_JS}#i" src/wp_theme/functions.php

# Fix Three.js sketch path issue when loading image
mkdir -p src/wp_theme/js/images
mv src/wp_theme/images/earth.jpg src/wp_theme/js/images/

# Build Gutenberg plugin
cd src/wp_plugin/prism

npm run build &
build_process_id=$!
wait $build_process_id

# Create archive with theme and plugin files
cd $TOP_LVL_DIR
tar -czf sojourn.tar.gz src/wp_plugin/build src/wp_theme/*


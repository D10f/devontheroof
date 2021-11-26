#!/bin/bash

# Remove pre-exisint tar files
rm sojourn-plugins.tar.gz 

# Build Gutenberg plugin
pushd src/wp-plugins/prism
npm run build
popd

# Create archive with theme and plugin files
tar -czf sojourn-plugins.tar.gz \
  src/wp-plugins/prism/index.php \
  src/wp-plugins/prism/src/index.js \
  src/wp-plugins/prism/build

#!/bin/bash

# Build Docker image
docker build --rm --target development -t developer-sojourn_webpack .

# Spin up container and build frontend files
docker run \
  --rm \
  -v $(pwd):/app \
  -v /app/node_modules \
  developer-sojourn_webpack sh -c "NODE_ENV=production webpack"

# Update WordPress theme css
MAIN_CSS=$(ls dist/main.*.css | cut -d "/" -f2)
sed -i "s/main.*.css/${MAIN_CSS}/i" src/wp-theme/functions.php

# Update WordPress theme js
MAIN_JS=$(ls dist/main.*.js | cut -d "/" -f2)
sed -i "s/main.*.js/${MAIN_JS}/i" src/wp-theme/functions.php

# Copy theme files over to dist
cp -r src/wp-theme/* dist/

# Copy PGP public-key to dist
cp assets/publickey.devsojourn@pm.me.asc dist/

# Remove unnecesary .html and .txt files
rm dist/*.html dist/*.txt

# Remove pre-existing tar files
rm devontheroof.tar*

# Create archive with theme files
tar -czf devontheroof.tar.gz dist

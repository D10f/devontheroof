#!/bin/bash

ROOT_DIR=$(pwd)

# Run from within plugin directory
pushd src/wp-plugins/prism

# Build Docker image
docker build \
    --target development \
    -t devontheroof_plugin_build \
    -f ${ROOT_DIR}/Dockerfile \
    .

# Spin up container and build files
docker run \
    --rm \
    -v $(pwd):/app \
    -v /app/node_modules \
    devontheroof_plugin_build sh -c "npm run build"

# Create archive with theme and plugin files
tar -czf ${ROOT_DIR}/devontheroof_plugin.tar.gz \
  index.php \
  src/index.js \
  build

popd
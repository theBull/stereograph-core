#!/bin/bash

# Run unit tests
echo "Building application and running unit tests..."
karma start --watch false --single-run

pwd=$(pwd)
echo "Removing $pwd/dist directory..."
rm -rf "$pwd/dist"

echo 'Updating npm package version patch...'
npm version patch

echo 'Packaging up library...'
npm run packagr

echo 'Updating git...'
git add . && git commit -m 'Version update' && git push -f origin master

echo 'Changing directory into dist/...'
cd ./dist

echo 'Publishing to NPM...'
npm publish --access public

echo 'Publish successful.'
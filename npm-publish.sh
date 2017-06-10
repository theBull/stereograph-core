#!/bin/bash

# Run unit tests
karma start --watch false --single-run

pwd=$(pwd)
echo "Removing $pwd/dist directory..."
rm -rf "$pwd/dist"

echo 'Compiling TypeScript files...'
tsc

echo 'Copying CSS and HTML files...'
cd src/app && find . -name '*.html' -or -name '*.css' | cpio -pdm ../../dist && cd ../../

echo 'Updating git...'
git add . && git commit -m 'Version update' && git push -f origin master

echo 'Updating npm package version patch...'
npm version patch

echo 'Copying package.json to dist/...'
cp ./package.json ./dist/package.json 
cp ./README.md ./dist/README.md

echo 'Changing directory into dist/...'
cd ./dist

echo 'Publishing to NPM...'
npm publish --access public

echo 'Publish successful.'
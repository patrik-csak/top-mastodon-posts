#!/usr/bin/env bash

# https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs

cd public

# ico
inkscape icon.svg --export-width=32 --export-filename=icon.tmp.png
convert icon.tmp.png favicon.ico
rm icon.tmp.png

# apple-touch-icon
inkscape icon.svg --export-width=180 --export-filename=apple-touch-icon.png

# png
inkscape icon.svg --export-width=512 --export-filename=icon-512.png
inkscape icon.svg --export-width=192 --export-filename=icon-192.png

#!/usr/bin/env bash

# https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs

# ico
inkscape public/icon.svg --export-width=32 --export-filename=public/icon.tmp.png
convert public/icon.tmp.png public/favicon.ico
rm public/icon.tmp.png

# apple-touch-icon
inkscape public/icon.svg --export-width=180 --export-filename=public/apple-touch-icon.png

# png
inkscape public/icon.svg --export-width=512 --export-filename=public/icon-512.png
inkscape public/icon.svg --export-width=192 --export-filename=public/icon-192.png

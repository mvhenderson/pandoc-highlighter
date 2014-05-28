#!/usr/bin/env bash
# pandoc-highlighter | (C) 2014 Mike Henderson <mvhenderson@tds.net> | License: MIT
#
# Optional test highlight filter using Pandoc to ensure valid document creation.
#   filter.sh [pandoc args]
#
# The `to`, `output`, and `filter` args are automatically appended. Documents
# are written to the test/.tmp directory
#
# Example
#   ./test/filter --highlight-style=zenburn
#   open test/.tmp/filter*

if [ ! -e package.json ]
    then
        echo "FAIL: run from the project base directory"
        exit 1
fi

# create the output dir and remove old files
mkdir -p test/.tmp
rm -f test/.tmp/filter.*

# pandoc args
filt='-F bin/pandoc-highlighter.js'
output='-o test/.tmp/filter'
input='test/spec/filter.md'

# generate docs
pandoc -s $style -t html5 $filt $output.html $1 $input || exit 1
pandoc -s $style -t epub3 $filt $output.epub $1 $input || exit 1
pandoc -s $style $filt $output.docx $1 $input || exit 1
pandoc -s $style $filt $output.pdf $1 $input || exit 1

# open them
open test/.tmp/filter.*
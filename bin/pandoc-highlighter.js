#!/usr/bin/env node

/*! pandoc-highlighter | (C) 2014 Mike Henderson <mvhenderson@tds.net> | License: MIT */
// Pandoc filter for highlighted Code/CodeBlock using CodeMirror modes
'use strict';

/* Support Pandoc standart styles / templates
 Since Pandoc will not insert source code styles unless there is code in the
 document, we insert a code item with no text into the first Para item so
 Pandoc includes styles but doesn't render anything.

 It also uses a sentinal class `pandoc-highlighter-skip` to ensure we
 do not convert it to a raw block when the filter processes it.
 */
var styleHack = {
    't': 'Code',
    'c': [ ['',['javascript','pandoc-highlighter-skip'],[] ], '' ]
};

// Load highlighter and any custom modes (after global CodeMirror setup).
// Custom package must be installed globally or in tandem with this package.
var hl = null;
try {
    var custom = require('pandoc-highlighter-custom');
    hl = require('../')(custom.options);
    custom.loadModes();
    if (custom.styles) styleHack = false;
}
catch (e) {
    hl = require('../')();
}

// filter
var pandoc = require('pandoc-filter');
function action(type,value,format,meta) {
    if (type === 'Code' || type === 'CodeBlock') {
        return hl(type,value,format,meta);
    }
    if (styleHack && type === 'Para') {
        value.push(styleHack);
        styleHack = false;
        return pandoc.Para(value);
    }
}
pandoc.stdio(action);

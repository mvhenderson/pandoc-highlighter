#!/usr/bin/env node

/*! pandoc-highlighter | (C) 2014 Mike Henderson <mvhenderson@tds.net> | License: MIT */
// Pandoc filter for highlighted Code/CodeBlock using CodeMirror modes
// This version assume custom templates that support the full set of CodeMirror
// styles and does not include the styleworkaround of the pandoc-highlighter.
'use strict';

var hl = require('../lib/loader')(true);
var pandoc = require('pandoc-filter');

function action(type,value,format,meta) {
    if (type === 'Code' || type === 'CodeBlock') {
        return hl(type,value,format,meta);
    }
}
pandoc.stdio(action);

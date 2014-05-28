#!/usr/bin/env node

/*! pandoc-highlighter | (C) 2014 Mike Henderson <mvhenderson@tds.net> | License: MIT */
// Pandoc filter for highlighted Code/CodeBlock using CodeMirror modes
// This version assume custom templates that support the full set of CodeMirror
// styles and does not include the styleworkaround of the pandoc-highlighter.
'use strict';

var styleMap = {
    '_wrap':        'SourceCode',
    '*':            'CodeNormal',
    'atom':         'CodeAtom',
    'attribute':    'CodeAttribute',
    'bracket':      'CodeBracket',
    'builtin':      'CodeBuiltin',
    'comment':      'CodeComment',
    'def':          'CodeDef',
    'em':           'CodeEm',
    'error':        'CodeError',
    'header':       'CodeHeader',
    'hr':           'CodeHr',
    'invalidchar':  'CodeInvalidchar',
    'keyword':      'CodeKeyword',
    'link':         'CodeLink',
    'meta':         'CodeMeta',
    'negative':     'CodeNegative',
    'number':       'CodeNumber',
    'operator':     'CodeOperator',
    'positive':     'CodePositive',
    'property':     'CodeProperty',
    'punctuation':  'CodePunctuation',
    'qualifier':    'CodeQualifier',
    'quote':        'CodeQuote',
    'string':       'CodeString',
    'string-2':     'CodeString2',
    'strong':       'CodeStrong',
    'tag':          'CodeTag',
    'variable':     'CodeVariable',
    'variable-2':   'CodeVariable2',
    'variable-3':   'CodeVariable3'
};

var styles = {
    'docx':    styleMap,
    'epub':    styleMap,
    'epub3':   styleMap,
    'html':    styleMap,
    'html5':   styleMap,
    'latex':   styleMap,
    'openxml': styleMap,
    'pdf':     styleMap
};

// Load highlighter and any custom modes (after global CodeMirror setup).
// Custom package must be installed globally or in tandem with this package.
var hl = null;
try {
    var custom = require('pandoc-highlighter-custom');
    if (!custom.options.styles) custom.options.styles = styles;
    hl = require('../')(custom.options);
    custom.loadModes();
}
catch (e) {
    hl = require('../')({styles:styles});
}

// filter
var pandoc = require('pandoc-filter');
function action(type,value,format,meta) {
    if (type === 'Code' || type === 'CodeBlock') {
        return hl(type,value,format,meta);
    }
}
pandoc.stdio(action);

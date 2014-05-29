/*! pandoc-highlighter | (C) 2014 Mike Henderson <mvhenderson@tds.net> | License: MIT */
// Style definitions based on CodeMirror token names
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
    'string-2':     'CodeStringB',
    'strong':       'CodeStrong',
    'tag':          'CodeTag',
    'variable':     'CodeVariable',
    'variable-2':   'CodeVariableB',
    'variable-3':   'CodeVariableC'
};

module.exports = {
    'docx':    styleMap,
    'epub':    styleMap,
    'epub3':   styleMap,
    'html':    styleMap,
    'html5':   styleMap,
    'latex':   styleMap,
    'openxml': styleMap,
    'pdf':     styleMap
};

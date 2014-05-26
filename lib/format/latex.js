/*! pandoc-highlighter | (C) 2014 Mike Henderson <mvhenderson@tds.net> | License: MIT */
// LaTeX raw-content builder
'use strict';

var _ = require('lodash');

module.exports = function latex(styles) {

    styles = styles || {
        '_wrap':        'SourceCode',
        '*':            'NormalTok',
        'atom':         'OtherTok',
        'attribute':    'DataTypeTok',
        'bracket':      null,
        'builtin':      'KeywordTok',
        'comment':      'CommentTok',
        'def':          'DataTypeTok',
        'em':           null,
        'error':        'ErrorTok',
        'header':       null,
        'hr':           null,
        'invalidchar':  'ErrorTok',
        'keyword':      'KeywordTok',
        'link':         null,
        'meta':         'AlertTok',
        'negative':     null,
        'number':       'DecValTok',
        'operator':     null,
        'positive':     null,
        'property':     'OtherTok',
        'punctuation':  null,
        'qualifier':    null,
        'quote':        null,
        'string':       'StringTok',
        'string-2':     'CharTok',
        'strong':       null,
        'tag':          'KeywordTok',
        'variable':     'FunctionTok',
        'variable-2':   'FunctionTok',
        'variable-3':   'FunctionTok'
    };

    return {
        name: 'latex',
        escape: function (str) {
            str = str.replace(/\\/g,'\\textbackslash{}');
            str = str.replace(/{/g,'\\{');
            str = str.replace(/}/g,'\\}');
            return str;
        },
        token: _.template('\\<%= style %>{<%= token %>}'),
        style: function (style, last, token) {
            if (/^\s*$/.test(token)) return null;
            return styles[style] || styles['*'];
        },
        line: _.template('<%= line %>'),
        newline: function () { return '\n'; },
        block: _.template([
            '\\begin{Shaded}',
            '\\begin{Highlighting}[]',
            '<%= code %>',
            '\\end{Highlighting}',
            '\\end{Shaded}'
        ].join('\n'))
    };
};

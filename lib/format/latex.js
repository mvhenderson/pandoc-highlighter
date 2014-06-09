/*! pandoc-highlighter | (C) 2014 Mike Henderson <mvhenderson@tds.net> | License: MIT */
// LaTeX raw-content builder
'use strict';

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

    var isPandocStyle = (styles['*'] === 'NormalTok');

    return {
        name: 'latex',
        escape: function (str) {
            return str.split('').map(function (v) {
                if (v === '\\') return '\\textbackslash{}';
                if (v === '{') return '\\{';
                if (v === '}') return '\\}';
                return v;
            }).join('');
        },
        token: function (data) {
            return '\\'+data.style+'{'+data.token+'}';
        },
        style: function (style, last, token) {
            if (/^\s*$/.test(token)) return null;
            return styles[style] || styles['*'];
        },
        line: function (data) {
            return data.line;
        },
        newline: function () {
            return '\n';
        },
        block: function (data) {
            return '\\begin{Shaded}\n' +
            '\\begin{Highlighting}[]\n' +
            data.code + '\n' +
            '\\end{Highlighting}\n' +
            '\\end{Shaded}';
        },
        inline: function (data) {
            if (isPandocStyle) return '\\VERB|'+data.code+'|';
            return '\\InlineCode{\\VERB|'+data.code+'|}';
        },
    };
};

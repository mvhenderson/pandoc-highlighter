/*! pandoc-highlighter | (C) 2014 Mike Henderson <mvhenderson@tds.net> | License: MIT */
// HTML raw-content builder
'use strict';

var _ = require('lodash');

module.exports = function html(styles) {

    styles = styles || {
        '_wrap':        'sourceCode',
        'atom':         'ot',
        'attribute':    'dt',
        'bracket':      null,
        'builtin':      'kw',
        'comment':      'co',
        'def':          'dt',
        'em':           null,
        'error':        'er',
        'header':       null,
        'hr':           null,
        'invalidchar':  'er',
        'keyword':      'kw',
        'link':         null,
        'meta':         'al',
        'negative':     null,
        'number':       'dv',
        'operator':     null,
        'positive':     null,
        'property':     'ot',
        'punctuation':  null,
        'qualifier':    null,
        'quote':        null,
        'string':       'st',
        'string-2':     'ch',
        'strong':       null,
        'tag':          'kw',
        'variable':     'fu',
        'variable-2':   'fu',
        'variable-3':   'fu'
    };

    return {
        name: 'html',
        escape: _.escape,
        token: function (data) {
            return '<span class="'+data.style+'">'+data.token+'</span>';
        },
        style: function (style) {
            return styles[style] || null;
        },
        line: function (data) {
            return data.line;
        },
        newline: function () {
            return '\n';
        },
        block: function (data) {
            return '<pre class="'+styles._wrap+'">' +
            '<code class="'+styles._wrap+'">' +
            data.code +
            '</code>' +
            '</pre>';
        },
        inline: function (data) {
            return '<code class="'+styles._wrap+'">' + data.code + '</code>';
        }
    };
};

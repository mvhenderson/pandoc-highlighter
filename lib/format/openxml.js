/*! pandoc-highlighter | (C) 2014 Mike Henderson <mvhenderson@tds.net> | License: MIT */
// OpenXML raw-content builder
'use strict';

var _ = require('lodash');

module.exports = function openxml(styles) {

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
        name: 'openxml',
        escape: _.escape,
        token: function (data) {
            return '<w:r>' +
            '<w:rPr>' +
            '<w:rStyle w:val="'+data.style+'"/>' +
            '</w:rPr>' +
            '<w:t xml:space="preserve">'+data.token+'</w:t>' +
            '</w:r>' +
            '\n';
        },
        style: function (style) {
            return styles[style] || styles['*'];
        },
        line: function (data) {
            return data.line;
        },
        newline: function () {
            return '<w:r><w:br w:type="textWrapping"/></w:r>\n';
        },
        block: function (data) {
            return '<w:p>' +
            '<w:pPr>' +
            '<w:pStyle w:val="'+styles._wrap+'"/>' +
            '</w:pPr>\n' +
            data.code +
            '</w:p>';
        },
        inline: function (data) {
            return data.code;
        }
    };
};

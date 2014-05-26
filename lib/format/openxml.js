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
        token: _.template([
            '<w:r>',
            '<w:rPr>',
            '<w:rStyle w:val="<%= style %>"/>',
            '</w:rPr>',
            '<w:t xml:space="preserve"><%= token %></w:t>',
            '</w:r>',
            '\n'
        ].join('')),
        style: function (style) {
            return styles[style] || styles['*'];
        },
        line: _.template('<%= line %>'),
        newline: function nl() {
            return '<w:r><w:br w:type="textWrapping"/></w:r>\n';
        },
        block: _.template([
            '<w:p>',
            '<w:pPr>',
            '<w:pStyle w:val="SourceCode"/>',
            '</w:pPr>\n',
            '<%= code %>',
            '</w:p>'
        ].join('')),
        inline: _.template([
            '<%= code %>',
        ].join(''))

    };
};

/*! pandoc-highlighter | (C) 2014 Mike Henderson <mvhenderson@tds.net> | License: MIT */
/* global CodeMirror */
'use strict';

var _ = require('lodash');

// Create global to support custom modes not in the codemirror distribution
GLOBAL.CodeMirror = require('codemirror/addon/runmode/runmode.node.js');

module.exports = function (options) {
    options = options || {};

    // Custom styles -- all supported formats must be defined
    var styles = options.styles || {};

    // Aliases to various CodeMirror mime configs
    var aliases = _.defaults(options.aliases || {}, require('./lib/aliases'));

    /* Parse pandoc attribute array into object and lazy load mode
        in : [ id, [classes], [[key,value],[key,value]] ]
        out: { id: '', classes: [], spec: ''|{name: lang, ...} }
     */
    function resolveAttr(attr) {
        var obj = {};
        obj.id = attr[0];
        obj.classes = attr[1];

        // Flag indicating not to touch this code block.
        // Used by the filter to hack around getting standard styles into output
        // but may be generally useful for other reasons too.
        if (obj.classes[1] === 'pandoc-highlighter-skip') return;

        // determine the spec
        var mode = obj.classes[0];
        var vars = _.zipObject(attr[2]);
        if (vars.mime) {
            // explicit mime type {.javascript mime="application/json"}
            obj.spec = vars.mime;
        }
        else if (attr[2].length) {
            // constructed spec {.gas architecture="x86"}
            vars.name = mode;
            obj.spec = vars;
        }
        else {
            // just a mode name or alias  {.javascript} or ```javascript
            obj.spec = aliases[mode] || mode;
        }

        // lazy load the mode, defaulting to plain text
        try {
            CodeMirror.getMode({},obj.spec);
        }
        catch (e) {
            try {
                require('codemirror/mode/'+mode+'/'+mode);
                CodeMirror.getMode({},obj.spec);
            }
            catch (e) {
                obj.spec = 'null';
            }
        }

        return obj;
    }

    // Load formatter (if supported)
    function resolveFormat(format) {
        try {
            return require('./lib/format/' + format)(styles[format]);
        }
        catch (e) {
            return null;
        }
    }

    // highlight a Pandoc Code/CodeBlock, collapsing consecutive styles
    return function highlight(type, value, format) {
        format = resolveFormat(format);
        if (!format) return;

        var attr = resolveAttr(value[0]);
        if (!attr) return;

        var lines = [];
        var line = '';
        var last = {style:null,token:''};

        function flushLast() { // append last token to current line
            if (last.token) {
                if (last.style) line += format.token(last);
                else line += last.token;
            }
        }

        function flushLine() { // start a new line
            flushLast();
            lines.push(format.line({ line: line }));
            line = '';
            last = {style:null,token:''};
        }

        CodeMirror.runMode(value[1], attr.spec, function hl(token, style) {
            if (token === '\n') return flushLine();

            // Append token to current buffer, or flush and start new buffer
            token = format.escape(token);
            style = format.style(style, last.style, token);
            if (style === last.style) {
                last.token += token;
            }
            else {
                flushLast();
                last = {style:style,token:token};
            }
        });
        flushLine();

        return {
            t: type === 'CodeBlock' ? 'RawBlock' : 'RawInline',
            c: [
                format.name,
                format.block({ code:lines.join(format.newline()) })
            ]
        };
    };
};
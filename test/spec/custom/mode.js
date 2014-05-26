/*! pandoc-highlighter | (C) 2014 Mike Henderson <mvhenderson@tds.net> | License: MIT */
/* global CodeMirror */
// Simple custom mode which highlightes any word with an 'o'
'use strict';

(function(mod) {
    // NOTE: Custom modes must use the global CodeMirror object setup by filter
    mod(CodeMirror);
})(function(CodeMirror) {
    CodeMirror.defineMode('custom', function() {
        return {
            token: function(stream) {
                if (stream.eatWhile(/\w/)) {
                    if (/o/.test(stream.current())) return 'keyword';
                }
                stream.eatWhile(/\W/);
                return null;
            }
        };
    });
});

/*! pandoc-highlighter | (C) 2014 Mike Henderson <mvhenderson@tds.net> | License: MIT */
// Simple custom highlighter for testing
'use strict';

module.exports = {
    options: {
        aliases: {
            theLetterO: 'custom'
        }
    },
    loadModes: function () {
        require('./mode');
    }
};

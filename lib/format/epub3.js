/*! pandoc-highlighter | (C) 2014 Mike Henderson <mvhenderson@tds.net> | License: MIT */
// EPUB raw-content builder
'use strict';

module.exports = function epub3(styles) {
    return require('./html')(styles);
};

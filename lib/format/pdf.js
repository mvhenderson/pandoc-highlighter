/*! pandoc-highlighter | (C) 2014 Mike Henderson <mvhenderson@tds.net> | License: MIT */
// PDF raw-content builder
'use strict';

module.exports = function pdf(styles) {
    return require('./latex')(styles);
};

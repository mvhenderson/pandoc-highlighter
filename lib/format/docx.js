/*! pandoc-highlighter | (C) 2014 Mike Henderson <mvhenderson@tds.net> | License: MIT */
// Word document raw-content builder
'use strict';

module.exports = function docx(styles) {
    return require('./openxml')(styles);
};

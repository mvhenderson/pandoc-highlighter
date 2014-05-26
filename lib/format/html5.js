/*! pandoc-highlighter | (C) 2014 Mike Henderson <mvhenderson@tds.net> | License: MIT */
// HTML5 raw-content builder
'use strict';

module.exports = function html5(styles) {
    return require('./html')(styles);
};

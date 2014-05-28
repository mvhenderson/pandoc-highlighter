/*! pandoc-highlighter | (C) 2014 Mike Henderson <mvhenderson@tds.net> | License: MIT */
// Load highligher function, optionally with custom modes / options
// Based on code from grunt-cli
'use strict';

var findup = require('findup-sync');
var resolve = require('resolve').sync;
var basedir = process.cwd();

module.exports = function (useCodeMirrorStyles) {
    // find custom module
    var custompath;
    try {
        custompath = resolve('pandoc-highlighter-custom', {basedir:basedir});
    }
    catch (e) {
        custompath = findup('pandoc-highlighter-custom.js');
        if (!custompath) custompath = findup('test/spec/custom/index.js');
    }

    // load highlighter
    var hl = null;
    try {
        // use found custom path or global
        var custom = custompath
            ? require(custompath)
            : require('pandoc-highlighter-custom');

        if (!custom.options.styles && useCodeMirrorStyles) {
            custom.options.styles = require('./styles');
        }
        hl = require('../')(custom.options);
        custom.loadModes();
    }
    catch (e) {
        var options = useCodeMirrorStyles
            ? {styles:require('./styles')}
            : {};
        hl = require('../')(options);
    }

    return hl;
};
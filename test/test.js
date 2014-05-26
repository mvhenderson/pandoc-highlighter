/*! pandoc-highlighter | (C) 2014 Mike Henderson <mvhenderson@tds.net> | License: MIT */
/* global describe, it */
'use strict';

var should = require('should');
var mkdirp = require('mkdirp');
var path = require('path');
var fs = require('fs');

// the highlighter, with options for testing
var hl = require('../index')({
    aliases: {
        'tpircsavaj': 'javascript', // alias to mode
        'nosj': 'application/json', // alias to mime
        'ARMv6': {name: 'gas', architecture: 'ARMv6'}, //alias to spec
    },
    styles: {} // skip the styleHack for now
});

function run(input, output, classes, format, vars) {
    var value = [
        ['', classes, vars || []],
        fs.readFileSync('test/spec/'+input).toString()
    ];

    var expected = fs.readFileSync('test/spec/'+output).toString().split('\n');
    // expected.pop();  //remove trailing newline

    var actual = hl('CodeBlock', value, format, {}).c[1];

    // dump output to file if .tmp exists...for easy diffing of changes
    if (fs.existsSync('test/.tmp')) {
        var out = 'test/.tmp/'+output;
        mkdirp.sync(path.dirname(out));
        fs.writeFileSync(out,actual);
    }

    actual = actual.split('\n');
    actual.should.eql(expected);
}

describe('Format', function () {
    it('html', function () {
        run('js/code.js','js/raw.html',['javascript'],'html');
    });

    it('html5', function () {
        run('js/code.js','js/raw.html',['javascript'],'html5');
    });

    it('pdf', function () {
        run('js/code.js','js/raw.latex',['javascript'],'pdf');
    });

    it('docx', function () {
        run('js/code.js','js/raw.xml',['javascript'],'docx');
    });

    it('epub', function () {
        run('js/code.js','js/raw.xhtml',['javascript'],'epub3');
    });

    it('ignores unsupported formats', function () {
        if (should(hl('CodeBlock',['',[],[]],'markdown') === undefined).ok);
    });

});

describe('Language', function () {
    it('explicit mime', function () {
        run('cpp/code.cpp','cpp/raw.html',['clike'],'html',[['mime','text/x-c++src']]);
    });

    it('constructed spec', function () {
        run('gas/code.gas','gas/raw.html',['gas'],'html',[['architecture','ARMv6']]);
    });

    it('standard alias', function () {
        run('json/code.json','json/raw.html',['json'],'html');
    });

    it('custom alias to mode', function () {
        run('js/code.js','js/raw.html',['tpircsavaj'],'html');
    });

    it('custom alias to mime', function () {
        run('json/code.json','json/raw.html',['nosj'],'html');
    });

    it('custom alias to spec', function () {
        run('gas/code.gas','gas/raw.html',['ARMv6'],'html');
    });

    it('uses plain text for unknown languages', function () {
        var value = [
            ['', ['unknown'], []],
            'some code'
        ];
        var actual = hl('CodeBlock', value, 'html');
        actual.should.eql({
            t: 'RawBlock',
            c: ['html','<pre class="SourceCode"><code class="SourceCode">some code</code></pre>']
        });
    });

    it('supports custom language modes', function xxx() {
        require('./spec/custom/mode');
        run('custom/code.custom','custom/raw.html',['custom'],'html');
    });
});

## About

A [Pandoc][] filter for highlighting code using [CodeMirror][]

### Why

For languages that Pandoc doesn't support, such as a DSL that cannot be open
source. 

Also, with custom templates, it allows for more control over syntax
highlighting colors.

### How

During filtering it replaces `Code` and `CodeBlock` elements with `RawInline`
and `RawBlock` elements.

Currently the supported output formats are:
- html / html5 / epub3
- latex / pdf
- docx / openxml

Out of the box it supports all the standard Pandoc themes, though not as
granular as the CodeMirror themes.

## Install

```bash
npm install -g pandoc-highlighter
```

## Example

```bash
pandoc -o sample.html -F pandoc-highlighter sample.md
```

## License

MIT

[CodeMirror]: http://codemirror.net
[Pandoc]: http://johnmacfarlane.net/pandoc

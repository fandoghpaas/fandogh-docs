[![npm](https://nodei.co/npm/remark-squeeze-paragraphs.png)](https://npmjs.com/package/remark-squeeze-paragraphs)

# remark-squeeze-paragraphs

[![Build Status][travis-badge]][travis] [![Dependency Status][david-badge]][david]

[Remark][] plugin for removing empty paragraphs.

Paragraph is considered empty if it is composed of whitespace characters only.

[remark]: https://github.com/wooorm/remark
[mdast]: https://github.com/syntax-tree/mdast
[mdast-squeeze-paragraphs]: https://github.com/eush77/mdast-squeeze-paragraphs

[travis]: https://travis-ci.org/eush77/remark-squeeze-paragraphs
[travis-badge]: https://travis-ci.org/eush77/remark-squeeze-paragraphs.svg
[david]: https://david-dm.org/eush77/remark-squeeze-paragraphs
[david-badge]: https://david-dm.org/eush77/remark-squeeze-paragraphs.png

## Example

```js
var squeezeParagraphs = require('remark-squeeze-paragraphs');
var stripBadges = require('remark-strip-badges');

remark()
  .use(stripBadges)
  .processSync('![](http://img.shields.io/)\n\ntext')
//=> "\n\ntext\n"

remark()
  .use(stripBadges)
  .use(squeezeParagraphs)
  .processSync('![](http://img.shields.io/)\n\ntext')
//=> "text\n"
```

## API

```js
remark().use(squeezeParagraphs)
```

Modifies AST in-place.

## CLI

```
remark -u remark-squeeze-paragraphs
```

## Related

-   [mdast-squeeze-paragraphs][] — [mdast][] transformation utility that is in the core of this plugin.

## Install

```
npm install remark-squeeze-paragraphs
```

## License

MIT

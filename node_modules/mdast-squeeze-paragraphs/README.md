[![npm](https://nodei.co/npm/mdast-squeeze-paragraphs.png)](https://npmjs.com/package/mdast-squeeze-paragraphs)

# mdast-squeeze-paragraphs

[![Build Status][travis-badge]][travis] [![Dependency Status][david-badge]][david]

> :warning:
>
> This is an AST transformer for [mdast][] syntax trees. A [remark][] plugin has been split up into [a different project][remark-squeeze-paragraphs].

Remove empty paragraphs from [mdast][] tree.

Paragraph is considered empty if it is composed of whitespace characters only.

[mdast]: https://github.com/syntax-tree/mdast
[remark]: https://github.com/wooorm/remark
[remark-squeeze-paragraphs]: https://github.com/eush77/remark-squeeze-paragraphs

[travis]: https://travis-ci.org/eush77/mdast-squeeze-paragraphs
[travis-badge]: https://travis-ci.org/eush77/mdast-squeeze-paragraphs.svg
[david]: https://david-dm.org/eush77/mdast-squeeze-paragraphs
[david-badge]: https://david-dm.org/eush77/mdast-squeeze-paragraphs.png

## Example

```js
var squeezeParagraphs = require('mdast-squeeze-paragraphs');

ast
//=> {
//     "type": "root",
//     "children": [
//       {
//         "type": "paragraph",
//         "children": []
//       },
//       {
//         "type": "paragraph",
//         "children": [
//           {
//             "type": "text",
//             "value": "foo"
//           }
//         ]
//       }
//     ]
//   }

squeezeParagraphs(ast)
//=> {
//     "type": "root",
//     "children": [
//       {
//         "type": "paragraph",
//         "children": [
//           {
//             "type": "text",
//             "value": "foo"
//           }
//         ]
//       }
//     ]
//   }
```

## API

#### `squeezeParagraphs(ast)`

Modifies AST in-place. Returns `ast`.

## Related

-   [remark-squeeze-paragraphs][] — [remark][] plugin wrapper.

## Install

```
npm install mdast-squeeze-paragraphs
```

## License

MIT

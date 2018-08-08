'use strict';

var remove = require('unist-util-remove');


module.exports = function (ast) {
  return remove(ast, { cascade: false }, isEmptyParagraph);
};


// Whether paragraph is empty or composed only of whitespace.
function isEmptyParagraph (node) {
  return node.type == 'paragraph' && node.children.every(function (node) {
    return node.type == 'text' && /^\s*$/.test(node.value);
  });
}

# treeWalker
This function adds aria tree markup and keyboard navigation to an HTML list structure.

## General Form
- treeWalker (root, options)

** Note: root  should be the top "ul" element in the list structure


### Options:
- type: "menu" || "tree";
- open: (function), called when a node is opened with node as argument;
- close: (function), called when a node is closed, with node as an argument;
- instructions: function to run when tree first created (defaults to displayInstructions() which adds a div with role of "alert" following the root, then removes it after a short time;

## Demo

https://RichCaloggero.github.io/tree-walker/tree.html

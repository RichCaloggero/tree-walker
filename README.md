# treeWalker
This function adds aria tree markup and keyboard navigation to an HTML list structure.

## General Form
- treeWalker (root, options)

** Note: root  should be the top "ul" element in the list structure


### Options:
- type: "menu" || "tree";
- open: (function), called when a node is opened with node as argument;
- close: (function), called when a node is closed, with node as an argument;
- instructions: function to run when tree first created

### Details

Nodes passed to open and close are always `li` elements.

When type is "menu", menu roles are used; otherwise tree roles are used.

Instructions defaults  to a function which  adds a div with role of "alert" following the root, then removes it after a short time. This causes the screen reader to speak "alert", followed by a short message when the tree is created.

### Limitations

This probably won't work well for multiple trees in the same document. We plan on fixing this at some point.


## Demo

https://RichCaloggero.github.io/tree-walker/tree.html

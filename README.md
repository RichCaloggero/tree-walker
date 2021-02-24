# treeWalker
This function adds aria tree markup and keyboard navigation to an HTML list structure.

## General Form
- treeWalker (root, options)

** Note: root  should be the top "ul" element in the list structure


### Options:
- type: "menu" || "tree";
- expand: (function), called when a node is opened with node as argument;
- collapse: (function), called when a node is closed, with node as an argument;
- instructions: function to run when tree first created;
- instructionVisibility: number of milliseconds to display instructions (if 0, keeps instructions on screen, otherwise removes after the indicated time + 70 milliseconds to be sure screen reader can announce);
- instructionText: message to display (defaults to "move with arrows, follow links with enter");

### Details

Nodes passed to open and close are always `li` elements.

When type is "menu", menu roles are used; otherwise tree roles are used.

Instructions defaults  to a function which  adds a div with role of "alert" following the root, then removes it after a short time. This causes the screen reader to speak "alert", followed by a short message when the tree is created.


## Demo

https://RichCaloggero.github.io/tree-walker/tree.html

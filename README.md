# treeWalker
This function adds aria tree markup and keyboard navigation to an HTML list structure.

## General Form
- treeWalker (root, options)

** Note: root  should be the top "ul" element in the list structure


### Options:
- type: "menu" || "tree";
- expand: (function), called when a node is opened with `ul` as argument;
- collapse: (function), called when a node is closed, with `ul` as an argument;
- focus: if true, automatically sets focus to first child of top level `ul` (default: true);
- visuallyIndicateMenus: adds a down arrow to link content to indicate submenu (default: true);
- labelLinks: if true, always adds `aria-label` to branch, otherwise adds `aria-roledescription` (default: true);
- instructions: function to run when tree first created;
- instructionVisibility: number of milliseconds to display instructions (if 0, keeps instructions on screen, otherwise removes after the indicated time + 70 milliseconds to be sure screen reader can announce) (default: 0);
- instructionText: message to display (defaults: "move with arrows, follow links with enter");

### Details

Nodes passed to collapse() and collapse() are always `ul` elements.

When type is "menu", menu roles are used; otherwise tree roles are used.

Instructions defaults  to a function which  adds a div with role of "alert" following the root, then removes it after a short time. This causes the screen reader to speak "alert", followed by a short message when the tree is created. If instructionVisibility is set to 0, instructions stay on screen.

labelLinks always adds `aria-label` to branch, thus overriding any content in the link itself. The value of the attribute is set to the text content of the link. If the link has `href`, then the phrase "has link" is prepended to the label. The `aria-roledescription` attribute provides a more transparent way of handling this, but it's implementation is spotty. The other advantage of adding `aria-label` here is to override visual menu indicators (usually a DownArrow HTML entity).

visuallyIndicateLinks adds a down arrow to the link content automatically. This should be set to false if other methods of indicating submenus are implemented by the caller.


## Demo

https://RichCaloggero.github.io/tree-walker/tree.html

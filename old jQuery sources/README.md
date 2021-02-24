# treeWalker
This function adds aria tree markup and keyboard navigation to an HTML container.


## General Form
- treeWalker (options)
- or treeWalker (container, name, options)

** Note: container should be the top "ul" element in the list structure


### Options:
- root: (dom node), root node,
- open: (function), called when a node is opened with node as argument;
- close: (function), called when a node is closed, with node as an argument
- beforeOpen: (function), called before open with node as an argument

- group: (string), selects grouping items (default "ul")
- role_group: (string), role to attach to grouping items (default "group")
- role_root: (string), role of root element (default: "tree")

- branch: (string), selects branches (default "li")
- role_branch: (string), role to attach to branches (default "treeitem")

- state_expanded: (string), indicates expanded branch (default: "aria-expanded")

***  note: if open and close functions are not supplied, this function will have no effect; the open and close functions should generally show / hide nodes, respectively.

## Usage

Originally developed to make deeply nested lists used as menus accessible.
The menus used the CSS menu widgit called Superfish:
https://github.com/joeldbirch/superfish

### Demo
http://www.mit.edu/~rjc/aria/accessible-superfish/physionet.html

Here is a demo using the original deeply nested list structure for which the plugin was developed. Use arrows to move around the tree. Tree should gain focus when page launches, but if not, use tab to focus the tree, then use arrows to navigate.



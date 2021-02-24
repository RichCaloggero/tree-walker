/* treeWalker
  arguments:
 options,
 or container, name, options
  ** Note: container should be the top "ul" element in the list structure

  Options:
- root: root node,
- open: called when a node is opened with node as argument;
  - close: called when a node is closed, with node as an argument
  - beforeOpen: called before open with node as an argument
  
  - group: selects grouping items (default "ul")
  - role_group: role to attach to grouping items (default "group")
  - role_root: role of root element (default: "tree")

  - branch: selects branches (default "li")
  - role_branch: role to attach to branches (default "treeitem")

- state_expanded: indicates expanded branch (default: "aria-expanded")

***  note: if open and close functions are not supplied, this function will have no effect; the open and close functions should generally show / hide nodes, respectively.
*/

function treeWalker(root, name) {
// defaults
const options = {
name: "treeWalker",
open: function(){}, close: function(){},
role_root: "tree",
role_group: "group",
role_branch: "treeitem",
group: "ul",
branch: "li",
state_expanded: "aria-expanded"
}; // defaults

if (arguments.length == 1) {
options = Object.assign({}, options, arguments[0]);
} else if (arguments.length == 2) {
options = Object.assign({}, options, {root: root, name: name});
} else if (arguments.length == 3) {
options = Object.assign({}, options, {root: root, name: name}, arguments[2]);
} // if


return addKeyboardNavigation (addAria (root));

function addAria (root) {
$$("a, button, [tabindex]", root)forEach(node => node.setAttribute("tabindex", "-1"));

const $groups = $$(options.group, root);
$groups.forEach(node => node.setAttribute("role", options.role_group);
$groups.forEach(node => node.parentElement.classList.add("has-children"));
$$(".has-children", root).forEach(node => node.children[0].setAttribute("aria-expanded", "false"));
$groups.forEach(node => node.hidden = true);
root.setAttribute("role", "tree");

const $branches = $$(options.branch, root);
branches.forEach(node => node.setAttribute("role", option.role_branch);

return root;
} // addAria

function addKeyboardNavigation (root) {

// add keyboard handler
root.addEventListener("keydown", interactionHandler);

function interactionHandler (e) {
var action = String((e.type === "keydown")? e.key : "click");
var $newNode = null;
var $currentNode = getCurrentNode();
var actions = {
//click: "click",
"ArrowLeft": "previous", "ArrowRight": "next",
"ArrowUp": "up", "ArrowDown": "down",
"Enter": "execute"
};

if (! (action in actions)) {
//console.log ("key " + action + " not handled by treeWalker");
return true;
} // if

$newNode = navigate ($currentNode, actions[String(action)]);

if (isValidNode($newNode)) {
if (options.leaveNode && options.leaveNode instanceof Function) options.leaveNode ($currentNode, $newNode);
setCurrentNode ($newNode);
} // if
} // if

return false;
} // interactionHandler


function navigate ($start, operation) {
if (! isValidNode($start)) return null;

if (operation === "click") {
if (isLeafNode ($start)) {
return ($start);
} // if

if (!isOpened($start)) $start = open($start);
else $start = close ($start);
return $start;
} // if

if (options.noArrowKeyNavigation) return null;

switch (operation) {
case "previous": return previous ($start, options.flow);

case "next": return next ($start, options.flow);

case "up":
if (options.flow) {
$start = close($start);
$start = up($start);
} else {
$start = up($start);
$start = close($start);
} // if
return $start;

case "down": 
$start = open ($start);
return $start = down ($start);

default: return null;
} // switch

function hasChildren ($node) {
return !isLeafNode ($node);
} // hasChildren

function isLeafNode ($node) {
return !$node.hasAttribute(`[${options.state_expanded}]`);
} // isLeafNode

function isOpened ($node) {
return isValidNode($node) && $node.getAttribute(options.state_expanded) === "true";
} // isOpened

function open ($node) {
if (hasChildren($node) && !isOpened($node)) {
$node.setAttribute (options.state_expanded, "true");
if (options.open && options.open instanceof Function) options.open ($node);
} // if

return $node;
} // open

function close ($node) {
if (options.beforeClose && options.beforeClose instanceof Function) options.beforeClose($node); 
if (isOpened($node)) {
$node.setAttribute (options.state_expanded, "false");
if (options.close && options.close instanceof Function) options.close($node);
} // if

return $node;
} // close

function previous ($node, flow) {
let $result;
const $parent = up($node);
const $previous = $node.previousElementSibling;
if (! flow) return $previous;

if (isValidNode($previous) && !isLeafNode($previous) && isOpened($previous)) {
$result = down ($previous);
if ($result.nextAll().length > 0) $result = $result.nextAll().last();
return $result;
} // if

if (! isValidNode($previous) && isValidNode($parent) && isOpened($parent)) return $parent;
return $previous;
} // previous

function next ($node, flow) {
var $parent = up($node);
var $next = $node.next ();
if (! flow) return $next;

if (!isLeafNode($node) && isOpened($node)) return down ($node);

if (! isValidNode($next) && isValidNode($parent) && isOpened($parent)) return next($parent);
return $next;
} // next

function down ($node) {
return $node.find("[role=" + options.role_branch + "]:first");
} // down

function up ($node) {
return $node.parent().closest("[role=" + options.role_branch + "]");
} // up

} // navigate


function getCurrentNode () {
let $node;

$node = $("[tabindex=0]", root);

return (isValidNode($node))?
$node : null;
} // getCurrentNode

function setCurrentNode ($newNode) {
var $node = getCurrentNode ();

if (isValidNode ($newNode) && isValidNode ($node)) {

$node.setAttribute("tabindex", "-1");
$newNode.setAttribute("tabindex", "0");

if (options.currentNode && options.currentNode instanceof Function) options.currentNode ($newNode);

return $newNode;
} // if valid

return null;
} // setCurrentNode

function isValidNode ($node) {
return ($node && $node instanceof HTMLElement);

} // isValidNode


function debugNode ($node, label) {
//return;
var info = "(invalid)";

if (isValidNode($node)) info = $node[0].nodeName + $node.find("a:first").text();
if (label) debug (label, info);
return info;
} // debugNode

} // addKeyboardNavigation

function $ (selector, context = document) {
return  context.querySelector(selector);
} // $

function $$ (selector, context = document) {
return context.querySelectorAll(selector);
} // $$

} // treeWalker

/*function debug (text) {
//return;
var text = $.map ($.makeArray (arguments), function (arg) {
	var type = typeof(arg);
	if (type === "array" || type == "object") return JSON.stringify(arg) + "\n";
	else return arg;
}).join (" ");

if ($("#debug").length > 0) {
if (! text) {
$("#debug").html ("");
} else {
	$("#debug").append (document.createTextNode(text), "<br>\n");
} // if

} else {
console.error (text);
} // if
} // debug
*/

//alert ("treeWalker.js loaded");


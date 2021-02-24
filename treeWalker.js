const defaultOptions = {
type: "menu",
open: expandTree,
close: collapseTree,
instructions: displayInstructions
}; // defaultOptions

export function treeWalker  (root, options = {}) {
options = Object.assign({}, defaultOptions, options);
const menu = options.type === "menu";
const roles = setRoles(menu);
root.setAttribute("role", roles.top);
if (options.instructions instanceof Function) options.instructions(root);

$$("a, button, [tabindex]", root).forEach(x => x.setAttribute("tabindex", "-1"));

$$("ul, ol", root).forEach(subtree => subtree.setAttribute("role", roles.sub));
 
$$("li", root).forEach(branch => {
const link = $("[href]", branch);

branch.setAttribute("role", roles.branch);
if (link && link.getAttribute("href") !== "#") branch.setAttribute("aria-roledescription", "has link");
if ($("ul", branch)) {
branch.setAttribute("aria-expanded", "false");
if (menu) branch.setAttribute("aria-haspopup", "true");
} // if
}); // forEach branch

return initTreeNavigation(root);

function initTreeNavigation (root) {
let currentNode = null;
currentNode = focusNode(root.firstElementChild);

root.addEventListener("keydown", e => {
const key = e.key;

switch (key) {
case "ArrowDown": return focusNode(next(currentNode));
case "ArrowUp": return focusNode(previous(currentNode));

case "ArrowRight": return focusNode(down(currentNode));
case "ArrowLeft": return focusNode(up(currentNode));

case "Enter": return activateNode(currentNode);
case "Escape": return closeAll(root);

default: return true;
} // switch
}); // keydown

function next (node) {return node.nextElementSibling;}
function previous (node) {return node.previousElementSibling;}

function down (node) {
if (isLeafNode(node)) return null;
const sub = $(`[role=${roles.sub}]`, node);
expandTree(sub);
node.setAttribute("aria-expanded", "true");
return $(`[role=${roles.branch}]`, sub);
} // down

function up (node) {
const sub = node.parentElement;
collapseTree(sub);
const branch  = sub.closest(`[role=${roles.branch}]`);
branch.setAttribute("aria-expanded", "false");
return branch;
} // up

function focusNode (node) {
if (node) {
$$(`[role=${roles.branch}]`, root).forEach(branch => branch.setAttribute("tabindex", "-1"));
node.setAttribute("tabindex", "0");
currentNode = node;
node.focus();
} // if

return currentNode;
} // focusNode

function activateNode (node) {
const link = $("[href]", node);
if (link) location = link.getAttribute("href");
} // activateNode

function closeAll (root) {
$$(`[role=${roles.sub}].open`, root).forEach(sub => sub.removeAttribute("open"));
return focusNode(root.firstElementChild);
} // closeAll

function isLeafNode (node) {return node && !node.hasAttribute("aria-expanded");}
} // initTreeNavigation

function setRoles (menu) {
return menu?
{top: "menubar", branch: "menuitem", sub: "menu"}
: {top: "tree", branch: "treeitem", sub: "group"};
} // setRoles
} // initTree

export function expandTree (node) {node.classList.add("open");}
export function collapseTree (node) {node.classList.remove("open");}

function displayInstructions (root) {
setTimeout(() => {
root.insertAdjacentHTML("afterend", '<div  role="alert">navigate with arrows, follow links with enter</div>');
//setTimeout(() => root.nextElementSibling.remove(), 70);
}, 130); // setTimeout
} // displayInstructions

function $ (selector, context = document) {
return context.querySelector(selector);
} // $

function $$ (selector, context = document) {
return context.querySelectorAll(selector);
} // $$


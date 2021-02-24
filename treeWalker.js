
treeWalker($("nav > ul"), {type: "menu"});

function treeWalker  (root, options = {type: "menu"}) {
const menu = options.type === "menu";
const roles = setRoles(menu);
root.setAttribute("role", roles.top);
setTimeout(() => root.insertAdjacentHTML("afterend", '<div role="alert">navigate with arrows, follow links with enter</div>'), 50);

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
$(`[role=${roles.sub}]`, node).classList.add("open");
return $(`[role=${roles.sub}] > [role=${roles.branch}]`, node);
} // down

function up (node) {
node.parentElement.classList.remove("open");
const newNode = node.parentElement.closest(`[role=${roles.branch}]`);
newNode.setAttribute("aria-expanded", "false");
return newNode;
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

function $ (selector, context = document) {
return context.querySelector(selector);
} // $

function $$ (selector, context = document) {
return context.querySelectorAll(selector);
} // $$


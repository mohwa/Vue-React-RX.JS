export function toDOM(template) {
  const body = document.createElement('body');

  body.innerHTML = template;

  if (body.childNodes.length > 1) {
    console.warn('You should have only one wrapper element');
  }
  return body.childNodes[0];
}

export function append(parentNode, childNode) {
  if (parentNode && childNode) {
    parentNode.appendChild(childNode);
  }
}

export function query(node, selector) {
  return node.querySelector(selector);
}

export function replaceWith(oldNode, newNode) {
  if (oldNode && newNode) {
    oldNode.replaceWith(newNode);
  }
}


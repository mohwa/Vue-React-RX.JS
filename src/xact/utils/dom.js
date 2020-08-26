import Data from "@xact/utils/data";

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

export function removeAllAttributes(node) {
  Array.from(node.attributes).forEach(({ name }) => {
    node.removeAttribute(name);
  });
}

export function removeAllProperties(node) {
  Data.map(node, (v, k) => {
    delete node[k];
  });
}

export function copyAllAttributes(originalNode, targetNode) {
  Array.from(originalNode.attributes).forEach(({ name, value }) => {
    targetNode.setAttribute(name, value);
  });
}

export function copyAllProperties(originalNode, targetNode) {
  Data.map(originalNode, (v, k) => {
    targetNode[k] = v;
  });
}

export function toDOM(template) {
  const body = document.createElement('body');

  body.innerHTML = template;

  if (body.childNodes.length > 1) {
    console.warn('You should have only one wrapper element');
  }
  return body.childNodes[0];
}

export function append(parentNode, childNode) {
  return parentNode.appendChild(childNode);
}

export function query(v, selector) {
  return v.querySelector(selector);
}

// export function events(node, options) {
//   Object
//     .entries(options)
//     .forEach(([eventName, listener]) => {
//       node.addEventListener(eventName, listener);
//     });
// }

export function replaceWith(oldNode, newNode) {
  oldNode.replaceWith(newNode);
}


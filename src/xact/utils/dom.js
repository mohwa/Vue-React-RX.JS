export function toDom(template) {
  const body = document.createElement('body');
  body.innerHTML = template;

  if (body.childNodes.length > 1) {
    console.warn('You should have only one wrapper element');
  }
  return body.childNodes[0];
}

export const append = (parentNode, childNode) => {
  parentNode.appendChild(childNode)
};

export const query = (parentNode, selector) => {
  return parentNode.querySelector(selector)
};

export const events = (node, options) => {
  Object
    .entries(options)
    .forEach(([eventName, listener]) => {
      node.addEventListener(eventName, listener);
    })
};

export const replaceWith = (oldNode, newNode) => {
  oldNode.replaceWith(newNode)
};


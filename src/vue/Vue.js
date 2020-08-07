import Dom from '@vue/Dom';
import Component, {Components} from '@vue/Component';

export default class Vue {
  options = {};
  rootComponent = null;
  static $$components = new Map();
  constructor(options = {}) {
    this.options = options;
    this.options.$vue = this;

    this.rootComponent = this.getRootComponent();

    this.render();
  }
  static component(tagName, options) {
    const v = Component.factory(tagName, options);

    this.$$components.set(v, options);

    return v;
  }
  $mount(selector) {
    this.options.selector = selector;

    this.render();
  }
  getRootComponent() {
    if (this.options.template) {
      return Component.factory('root', this.options);
    }
    return null;
  }
  render() {
    const { selector, template } = this.options;

    if (!selector) {
      return false;
    }

    const rootElement = document.querySelector(selector);

    this.parseGlobalComponents(rootElement);

    if (template) {
      document.querySelector(this.options.selector).innerHTML = '';
      this.parseRootComponent();
    }
  }
  parseGlobalComponents(root) {
    Vue.$$components.forEach((v) => {
      const targets = root.getElementsByTagName(v.tagName);

      Object.values(targets).forEach(vv => {
        if (vv.parentNode) {
          const el = Dom.getElementByTemplate(v.options.template);

          if (el) {
            vv.parentNode.replaceChild(el, vv);
          }
        }
      })
    });

    return root;
  }
  parseRootComponent() {
    const rootKey = 'root';
    const stacks = [Components.get(rootKey)];
    let stack;

    while (stack = stacks.pop()) {
      const { children, template } = stack;
      const matchedChildren = [];

      const parentElement = Dom.getElementByTemplate(template());

      console.log(parentElement);

      if (template) {
        children.forEach((child) => {
          const { tagName, template } = child;
          const targetElements = Object.values(parentElement.getElementsByTagName(tagName));

          if (targetElements.length) {
            matchedChildren.push(child);
          }

          targetElements.forEach((targetElement) => {
            const childElement = Dom.getElementByTemplate(template());
            targetElement.replaceWith(childElement);
          });
        });

        let length = children.length;

        while (length--) {
          const child = children[length];

          if (matchedChildren.includes(child)) {
            stacks.push(child);
          }
        }
      }
    }

    // console.log(parsedElements);

    // document.querySelector(this.options.selector).appendChild(oldParentElement);
  }
}

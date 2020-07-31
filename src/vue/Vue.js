import Data from '@vue/Data';
import Dom from '@vue/Dom';

class Component {
  tagName = '';
  children = [];
  options = {};
  constructor(tagName = '', options = {}) {
    this.tagName = tagName;
    this.options = options;

    this.children = this.getChildren();
  }
  static factory(...args) {
    return new Component(...args);
  }
  getChildren() {
    const { components } = this.options;
    const ret = [];

    Data.forEach(components, k => {
      const v = components[k];
      const vv = Component.factory(k, v);

      ret.push(vv);
    });

    return ret;
  }
}

export default class Vue {
  options = {};
  rootComponent = null;
  static $$components = new Map();
  constructor(options = {}) {
    this.options = options;
    this.rootComponent = this.getRootComponent();

    this.render();
  }
  static component(tagName, opt) {
    const v = Component.factory(tagName, opt);
    this.$$components.set(v, v);

    return v;
  }
  $mount(selector) {
    this.options.selector = selector;

    this.render();
  }
  getRootComponent() {
    const { template, components } = this.options;

    if (template) {
      return Component.factory('root', {
        template,
        components,
      });
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
      rootElement.appendChild(this.parseRootComponent());
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
    const stacks = [this.rootComponent];
    let stack;

    const fragment = new DocumentFragment();
    const templateElement = Dom.getElementByTemplate(stacks[0].options.template);

    fragment.appendChild(templateElement);

    while (stack = stacks.pop()) {
      const { children, options: { template } = {} } = stack;
      const matchedChildren = [];

      const checkElement = Dom.getElementByTemplate(template);

      if (template) {
        children.forEach(v => {
          const { tagName, options } = v;
          const checkTargets = Object.values(checkElement.getElementsByTagName(tagName));
          const targets = Object.values(templateElement.getElementsByTagName(tagName));

          checkTargets.forEach((vv, index) => {
            if (vv.parentNode) {
              const target = targets[index];
              const el = Dom.getElementByTemplate(options.template);

              if (el) {
                matchedChildren.push(v);
                target.parentNode.replaceChild(el, target);
              }
            }
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

    return fragment;
  }
}

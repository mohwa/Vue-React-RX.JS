import Data from "@vue/Data";
import Watcher from "@vue/Watcher";
import Dom from "@vue/Dom";

export class Components {
  static components = new Map();
  static add(k, v) {
    this.components.set(k, v);

    return v;
  }
  static has(k) {
    return this.components.has(k);
  }
  static get(k) {
    return this.components.get(k);
  }
}

export default class Component {
  tagName = '';
  template = '';
  options = {};
  children = [];
  // methods = {};
  constructor(tagName = '', options = {}) {
    this.tagName = tagName;
    this.options = options;

    this.children = this.getChildren(options.components);

    const watcher = Watcher.factory({ ...options });

    if (options.template) {
      this.template = options.template.bind(watcher.$watcher);
    }

    watcher.subscribeByData((v) => {
      console.log('UPDATE DATA', v);
      // this.parse(this);
    });

    watcher.subscribeByComputed((v) => {
      console.log('UPDATE COMPUTED', v);
    });

    // this.methods = { ...this.getMethods(options.methods) };
  }
  static factory(...args) {
    const k = args[0];

    if (Components.has(k)) {
      return Components.get(k);
    } else {
      const v = new Component(...args);
      Components.add(k, v);

      return v;
    }
  }
  getChildren(components) {
    const ret = [];

    Data.forEach(components, k => {
      const v = components[k];

      if (Components.has(k)) {
        ret.push(Components.get(k));
      } else {
        ret.push(Component.factory(k, v));
      }
    });

    return ret;
  }
  parse(renderComponent) {
    const rootKey = 'root';
    const stacks = [Components.get(rootKey)];
    let stack;

    const fragment = new DocumentFragment();
    const rootElement = Dom.getElementByTemplate(stacks[0].template());

    fragment.appendChild(rootElement);

    while (stack = stacks.pop()) {
      const { children, template } = stack;
      console.log(stack);
      const matchedChildren = [];

      const parentElement = Dom.getElementByTemplate(template());

      if (template) {
        children.forEach((child) => {
          const { tagName, template } = child;
          const checkElements = Object.values(parentElement.getElementsByTagName(tagName));

          checkElements.forEach((checkElement) => {
            const el = Dom.getElementByTemplate(template());

            if (el) {
              matchedChildren.push(child);
              checkElement.replaceWith(el);
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
  // getMethods(methods) {
  //   const ret = {};
  //
  //   Data.forEach(methods, k => {
  //     let vv = methods[k];
  //
  //     ret[k] = vv.bind(this.options.data);
  //   });
  //
  //   return ret;
  // }
}

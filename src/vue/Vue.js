import Dom from '@vue/Dom';
// import Data from '@vue/Data';
import Component from '@vue/Component';
import Watcher from '@vue/Watcher';


export default class Vue {
  options = {};
  rootComponent = null;
  static $$components = new Map();
  constructor(options = {}) {
    this.options = options;

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
      rootElement.appendChild(this.rootComponent.parse());
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
}

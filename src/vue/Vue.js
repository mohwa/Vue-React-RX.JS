class Component {
  tagName = '';
  options = {};
  el = null;
  constructor(tagName, options = {}) {
    this.tagName = tagName;
    this.options = options;

    this.createElement();
  }
  static factory(...args) {
    return new Component(...args);
  }
  createElement() {
    this.el = document.createElement(this.tagName);
    this.el.innerHTML = this.options.template;
  }
}

export default class Vue {
  options = {};
  components = new Map();
  static $$components = new Map();
  constructor(options = {}) {
    this.options = options;
    this.components = this.initComponents(options.components);

    this.createComponents();
  }
  $mount(selector) {
    this.options.selector = selector;

    this.createComponents();
  }
  initComponents(components) {
    Object.keys(components).forEach(k => {
      const v = components[k];
      const com = Component.factory(k, v);

      this.components.set(com, com);
    });

    return this.components;
  }
  createComponents() {
    const { selector, template } = this.options;

    if (!selector) {
      return false;
    }

    const root = document.querySelector(selector);
    const { el: templateRoot } = Component.factory('div', { template });

    root.appendChild(this.addComponentElements(templateRoot, Vue.$$components));
    root.appendChild(this.addComponentElements(templateRoot, this.components));
  }
  addComponentElements(root, components) {
    components.forEach((v) => {
      const { el } = v;
      const target = root.querySelectorAll(el.tagName)[0];

      if (target && target.parentNode) {
        if (!!target) {
          target.parentNode.replaceChild(el, target);
        }
      }
    });

    return root;
  }
  static component(tagName, opt) {
    const com = Component.factory(tagName, opt);

    this.$$components.set(com, com);

    return com;
  }
}

// function getDocumentFragment() {
//   return new DocumentFragment();
// }

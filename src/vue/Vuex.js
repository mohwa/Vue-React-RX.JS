import Data from '@vue/Data';

class Store {
  state = null;
  modules = null;
  constructor({ state, modules }) {
    this.state = Data.objectToMap(state);
    this.modules = Data.objectToMap(modules);
  }
  static factory(v = {}) {
    return new Store(v);
  }
  commit(type, v) {
  }
  dispatch(type, v) {
  }
}

export default class Vuex {
  static Store({ state, modules }) {
    return Store.factory({ state, modules });
  }
}


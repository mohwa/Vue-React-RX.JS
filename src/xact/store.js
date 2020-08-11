import Data from './utils/data';

export class Store {
  static reducers = {};
  static state = {};
  static createStore(reducers) {
    this.reducers = Data.reduce(reducers);
    this.state = Data.reduce(reducers, (v) => v());
  }
  static getState() {
    return this.state;
  }
  static dispatch(stateManager, subject, action = {}) {
    Data.forEach(this.reducers, (v, k) => {
      const newState = v(null, action);

      if (newState) {
        this.state[k] = newState;

        setTimeout(() => {
          stateManager.dispose();
          subject.next();
        });
      }
    });
  }
}

export default Store;

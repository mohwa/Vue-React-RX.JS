import Data from './utils/data';

export default class Store {
  static reducers = {};
  static state = {};
  static createStore(reducers) {
    this.reducers = Data.reduce(reducers);
    this.state = Data.reduce(reducers, (v) => v());
  }
  static getState() {
    return this.state;
  }
  static createDispatch(stateManager, subject) {
    const { reducers, state } = this;

    return (action) => {
      Data.forEach(reducers, (v, k) => {
        const newState = v(state[k], action);

        if (newState) {
          this.state[k] = newState;

          setTimeout(() => {
            stateManager.dispose();
            subject.next();
          });
        }
      });
    };
  }
};

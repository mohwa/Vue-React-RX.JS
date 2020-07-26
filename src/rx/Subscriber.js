export default class Subscriber {
  next = () => {};
  error = () => {};
  complete = () => {};
  constructor({ next = () => {}, error = () => {}, complete = () => {}, state = [] } = {}) {
    Object.assign(this, { next, error, complete, state });
  }
  static factory(v) {
    return new Subscriber(v);
  }
}

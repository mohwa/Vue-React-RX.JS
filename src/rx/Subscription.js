export default class Subscription {
  observers = new Set();
  constructor(observer) {
    this.observers.add(observer);
  }
  static factory(v) {
    return new Subscription(v);
  }
  unsubscribe() {
    this.observers.clear();
  }
}

export default class Subscription {
  subscriber = new Set();
  constructor(subscriber) {
    this.subscriber.add(subscriber);
  }
  static factory(v) {
    return new Subscription(v);
  }
  unsubscribe() {
    this.subscriber.clear();
  }
}

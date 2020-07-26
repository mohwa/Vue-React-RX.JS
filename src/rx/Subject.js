import Subscriber from '@rx/subscriber';

export default class Subject {
  observers = new Set();
  isStopped = false;
  static factory() {
    return new Subject();
  }
  subscribe({ next, error, complete }) {
    const subscriber = Subscriber.factory({ next, error, complete });
    this.observers.add(subscriber);
  }
  notify(type, v) {
    this.observers.forEach((o) => {
      o?.[type](v);
    });
  }
  unsubscribeAll() {
    this.observers.clear();
  }
  next(v) {
    if (!this.isStopped) {
      this.notify('next', v);
    }
  }
  error(v) {
    this.isStopped = true;
    this.notify('error', v);
    this.unsubscribeAll();
  }
  complete() {
    this.isStopped = true;
    this.notify('complete');
    this.unsubscribeAll();
  }
}

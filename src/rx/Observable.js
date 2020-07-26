// 구현해보니, Subscription 이 실제 옵져버들을 관리하는 역활을 하는듯하다.
import Subscription from '@rx/subscription';
import Subscriber from '@rx/subscriber';

export default class Observable {
  action = null;
  isStopped = false;
  constructor(action) {
    this.action = action;
  }
  static factory(action) {
    return new Observable(action);
  }
  static create(action) {
    return this.factory(action);
  }
  subscribe(...args) {
    const [next, error, complete] = args;
    const subscriber = Subscriber.factory();
    const subscription = Subscription.factory(subscriber);

    subscriber.next = (v) => {
      if (!this.isStopped) {
        next?.(v);
      }
    };

    subscriber.error = (v) => {
      this.isStopped = true;
      error?.(v);
      subscription.unsubscribe();
    };

    subscriber.complete = () => {
      this.isStopped = true;
      complete?.();
      subscription.unsubscribe();
    };

    if (this.action) {
      let unsubscribe;
      try {
        unsubscribe = this.action(subscriber);
      } catch (err) {
        error?.(err);
      }

      if (unsubscribe && unsubscribe instanceof Function) {
        unsubscribe?.();
      }
    }

    return subscription;
  }
}

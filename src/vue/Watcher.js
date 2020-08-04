import Data from "@vue/Data";
import Observable from "@rx/Observable";

export default class Watcher {
  options = {};
  $watcher = {};
  $state = {};
  constructor(options = {}) {
    this.options = options;

    Object.assign(this.$watcher, options.data);
    Object.assign(this.$watcher, this.getComputed(options));
    Object.assign(this.$state, this.$watcher);

    console.log(321312312, this, options.data);
  }
  static factory(v) {
    return new Watcher(v);
  }
  subscribeByData(next) {
    const { data } = this.options;

    Data.forEach(data, (k) => {
      const observable = Observable.create((subscriber) => {
        Object.defineProperty(this.$watcher, k, {
          get: () => {
            return this.$state[k];
          },
          set: (newV) => {
            const oldV = this.$state[k];

            if (oldV !== newV) {
              this.$state[k] = newV;
              subscriber.next(newV);
            }
          }
        });
      });

      observable.subscribe(next);
    });
  }
  subscribeByComputed(next) {
    const { computed } = this.options;

    Data.forEach(computed, (k) => {
      const v = computed[k];

      const observable = Observable.create((subscriber) => {
        let property = v;

        if (v instanceof Function) {
          property = {
            get: () => {
              this.$state[k] = v.call(this.$watcher);

              return this.$state[k];
            },
            writable: true,
          };
        } else if (v instanceof Object) {
          const { get = () => {}, set = () => {} } = v;

          property = {
            get: () => {
              this.$state[k] = get.call(this.$watcher);

              return this.$state[k];
            },
            set: (newV) => {
              const oldV = this.$state[k];

              if (oldV !== newV) {
                const ret = set.apply(this.$watcher, [newV]);
                this.$state[k] = ret;

                subscriber.next(ret);
              }
            },
          };
        }
        Object.defineProperty(this.$watcher, k, property);
      });

      observable.subscribe(next);
    });
  }
  getComputed(options) {
    const { computed = {} } = options;
    const ret = {};

    Data.forEach(computed, k => {
      let v = computed[k];

      if (typeof v === 'object') {
        v = v.get;
      }

      ret[k] = v.call(this.$watcher);
    });

    return ret;
  }
}

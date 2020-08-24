export default class Event {
  events = new WeakMap();
  constructor() {
  }
  static factory(v) {
    return new Event(v);
  }
  bind(node, handlers) {
    if (!node) return;

    const events = [];

    Object.entries(handlers).forEach(([type, handler]) => {
      node.addEventListener(type, handler);
      events.push({ type, handler });
    });

    this.events.set(node, events);
  }
  unbind(node, type, handler) {
    if (!node) return;

    const oldEvents = this.get(node);
    let removeEvents = oldEvents;

    switch (true) {
      case (node && type && !handler): {
        removeEvents = oldEvents.reduce((acc, v) => {
          if (v.type === type) acc.push(v);

          return acc;
        }, []);

        break;
      }
      case node && type && handler: {
        removeEvents = oldEvents.reduce((acc, v) => {
          if (v.type === type && v.handler === handler) {
            acc.push(v);
          }
          return acc;
        }, []);
        break;
      }
      default:
        break;
    }

    if (removeEvents && removeEvents.length) {
      removeEvents.forEach(v => {
        node.removeEventListener(v.type, v.handler);
      });

      const newEvents = oldEvents.reduce((acc, v) => {
        const hasEvent = removeEvents.some(vv => {
          return v.type === vv.type && v.handler === vv.handler;
        });

        if (!hasEvent) acc.push(v);

        return acc;
      }, []);


      this.events.delete(node);
      this.events.set(node, newEvents);
    }
  }
  get(node) {
    return this.events.get(node);
  }
  has(node) {
    return this.events.has(node);
  }
}

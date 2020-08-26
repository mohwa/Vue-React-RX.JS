export default class Event {
  events = new WeakMap();
  static factory() {
    return new Event();
  }
  one(node, handlers) {
    const oldEvents = this.get(node) || [];

    oldEvents.forEach(({ type, handler }) => {
      this.unbind(node, type, handler);
    });
    this.bind(node, handlers);
  }
  bind(node, handlers) {
    if (!node) return;

    let events = [];

    if (this.has(node)) {
      events = [...events, ...this.get(node)];
    }

    Object.entries(handlers).forEach(([type, handler]) => {
      node.addEventListener(type, handler);
      events.push({ type, handler });
    });

    this.events.set(node, events);
  }
  unbind(node, type, handler) {
    if (!node || !this.has(node)) return;

    const oldEvents = this.get(node);
    let removeEvents = oldEvents;

    switch (true) {
      case (node && type && !handler): {
        removeEvents = oldEvents.reduce((acc, v) => {
          if (v.type === type) {
            acc.push(v);
          }
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

    if (removeEvents.length) {
      removeEvents.forEach(v => node.removeEventListener(v.type, v.handler));

      const newEvents = oldEvents.reduce((acc, oldEvent) => {
        const hasEvent = removeEvents.some(removeEvent => {
          return (
            oldEvent.type === removeEvent.type &&
            oldEvent.handler === removeEvent.handler
          );
        });

        if (!hasEvent) acc.push(oldEvent);

        return acc;
      }, []);

      this.events.delete(node);

      if (newEvents.length) {
        this.events.set(node, newEvents);
      }
    }

    return node;
  }
  get(node) {
    return this.events.get(node);
  }
  has(node) {
    return this.events.has(node);
  }
}

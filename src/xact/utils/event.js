export default class Event {
  events = new WeakMap();
  constructor() {
  }
  static factory(v) {
    return new Event(v);
  }
  bind(node, options) {
    const events = [];

    Object.entries(options).forEach(([eventName, listener]) => {
      // node.addEventListener(eventName, listener);
      node[`on${eventName}`] = listener;
      events.push({ eventName, listener });
    });

    this.events.set(node, events);
  }
  // unbind(node, eventName, listener) {
  //   node.removeEvent(eventName, listener);
  //   const oldEvents = this.events.get(node);
  //
  //   const clearedEvents = oldEvents.reduce((acc, v) => {
  //     const { eventName: _eventName, listener: _listener } = v;
  //
  //     if (eventName !== _eventName && listener !== _listener) {
  //       acc.push(v);
  //     }
  //   }, []);
  //
  //   if (clearedEvents.length) {
  //     this.events.set(node, clearedEvents);
  //   } else {
  //     this.events.delete(node);
  //   }
  // }
}

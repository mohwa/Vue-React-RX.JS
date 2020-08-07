import {events, query, replaceWith} from './dom.js';
import {component} from './component.js';

export const Parent = component(({html, store}) => {
  const state = store.useState({
    count: 0
  });
  const actions = {
    upCount: () => {
      state.count.set(state.count.get() + 1)
    },
    downCount: () => {
      state.count.set(state.count.get() - 1)
    }
  };
  const render = () => {
    const dom = html(`<div>
      <h2>Parent-Child</h2>
      <div>${state.count.get()}</div>
      <child1></child1>
      <child2></child2>
     </div>`);

    const props = {
      buttonName: 'Up Count'
    };
    const emit1 = {
      upCount: actions.upCount,
    };

    const emit2 = {
      downCount: actions.downCount,
    };

    replaceWith(
      query(dom, 'child1'),
      Child1({props, emit: emit1})
    );

    replaceWith(
      query(dom, 'child2'),
      Child2({ props: { buttonName: 'TEST' }, emit: emit2}),
    );

    return dom;
  };

  return render;
});

export const Child1 = component(({html}, {props, emit}) => {
  const render = () => {
    const dom = html(`<div>
       <button type="button">${props.buttonName}</button>
     </div>`);

    events(query(dom, 'button'), {
      click: emit.upCount
    });

    return dom;
  };

  return render;
});

export const Child2 = component(({html}, {props, emit}) => {
  const render = () => {
    const dom = html(`<div>
       <button type="button">${props.buttonName}</button>
     </div>`);

    events(query(dom, 'button'), {
      click: emit.downCount
    });

    return dom;
  };

  return render;
});

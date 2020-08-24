import Subject from '@rx/Subject';
import { toDOM } from './utils/dom';
import StateManager from "./hooks/stateManager";
import createUseState from './hooks/createUseState';
import createUseEffect from './hooks/createUseEffect';
import createUseMemo from './hooks/createUseMemo';
import createUseCallback from './hooks/createUseCallback';
import createUseSelector from './hooks/createUseSelector';
import Store from './store';
import Event from './utils/event';

// https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
const NODE_TYPE = {
  ELEMENT_NODE: 1,
  TEXT_NODE: 3,
  CDATA_SECTION_NODE: 4,
  PROCESSING_INSTRUCTION_NODE: 7,
  COMMENT_NODE: 8,
  DOCUMENT_NODE: 9,
  DOCUMENT_TYPE_NODE: 10,
  DOCUMENT_FRAGMENT_NODE: 11,
};

export function component(createComponent) {
  return ({props = {}} = {}) => {
    const subject = Subject.factory();
    const stateManager = StateManager.factory();
    const useState = createUseState(stateManager, subject);
    const useEffect = createUseEffect(stateManager);
    const useMemo = createUseMemo(stateManager);
    const useCallback = createUseCallback(stateManager);
    const useSelector = createUseSelector(stateManager);
    const dispatch = Store.createDispatch(stateManager, subject);
    const state = {
      dom: null,
    };

    const render = (event) => {
      return createComponent({
        props,
        toDOM,
      }, {
        useState,
        useEffect,
        useMemo,
        useCallback,
        useSelector,
        dispatch,
        event,
      });
    };

    function observer() {
      const event = Event.factory();
      let newDom = render(event);

      if (state.dom) {
        const oldDom = replaceDomViaOldDom(state.dom, newDom);
        newDom = replaceDomViaNewDom(oldDom, newDom, event);
      }
      state.dom = newDom;
    }

    subject.subscribe({next: observer});
    observer();


    function replaceDomViaOldDom(oldDom, newDom) {
      const oldNodes = [oldDom];
      const newNodes = [newDom];

      let oldNode = null;
      let newNode = null;

      do {
        oldNode = oldNodes.pop();
        newNode = newNodes.pop();

        switch (true) {
          case (!newNode): {
            if (oldNode?.nodeType === NODE_TYPE.TEXT_NODE) {
              oldNode.parentNode.removeChild(oldNode);
            }
            break;
          }
          default: {
            if (oldNode?.nodeType === NODE_TYPE.TEXT_NODE) {
              if (oldNode.nodeValue !== newNode.nodeValue) {
                oldNode.replaceWith(newNode);
              }
            }
            break;
          }
        }

        oldNode?.childNodes.forEach((v, i) => {
          oldNodes.push(oldNode?.childNodes[i]);
          newNodes.push(newNode?.childNodes[i]);
        });
      }
      while (oldNode);

      return oldDom;
    }

    function replaceDomViaNewDom(oldDom, newDom, event) {
      const oldNodes = [oldDom];
      const newNodes = [newDom];

      let newNode = null;
      let oldNode = null;

      let prevOldNode = null;

      do {
        oldNode = oldNodes.pop();
        newNode = newNodes.pop();

        if (oldNode) {
          prevOldNode = oldNode;
        }

        switch (true) {
          case (!oldNode): {
            if (newNode?.nodeType === NODE_TYPE.TEXT_NODE) {
              prevOldNode.appendChild(newNode);
            }
            break;
          }
          default: {
            if (newNode?.nodeType === NODE_TYPE.TEXT_NODE) {
              if (oldNode.nodeValue !== newNode.nodeValue) {
                oldNode.replaceWith(newNode);
              }
            }
            break;
          }
        }

        if (oldNode && newNode) {
          const events = event.get(newNode);

          event.unbind(oldNode);

          if (events && events.length) {
            events.forEach((v) => {
              event.bind(oldNode, {[v.type]: v.handler});
            });
          }
        }

        newNode?.childNodes.forEach((v, i) => {
          newNodes.push(newNode?.childNodes[i]);
          oldNodes.push(oldNode?.childNodes[i]);
        });
      }
      while (newNode);

      return oldDom;
    }

    return state.dom;
  };
}



import { query } from "./dom";
import Subject from '@rx/Subject';
import { toDom } from './dom';
import StateManager from "./hooks/stateManager";
import useState from './hooks/useState';
import useEffect from './hooks/useEffect';
import useMemo from './hooks/useMemo';
import useCallback from './hooks/useCallback';

export function component(createComponent) {
  return ({ props = {} } = {}) => {
    const subject = Subject.factory();
    const stateManager = StateManager.factory();
    const _useState = useState.bind(null, stateManager, subject);
    const _useEffect = useEffect.bind(null, stateManager);
    const _useMemo = useMemo.bind(null, stateManager);
    const _useCallback = useCallback.bind(null, stateManager);
    const state = {
      dom: null,
    };

    const render = () => {
      return createComponent({
        props,
        toDom,
        useState: _useState,
        useEffect: _useEffect,
        useMemo: _useMemo,
        useCallback: _useCallback,
      });
    };

    function observer() {
      const newDom = render();

      if (state.dom) {
        replaceDomWithDiff(state.dom, newDom);
      }
      state.dom = newDom;
    }

    subject.subscribe({ next: observer });
    observer();


    function replaceDomWithDiff(prevDom, newDom) {
      const newStacks = [newDom];
      const oldStacks = [prevDom];
      let newStack = null;
      let oldStack = null;

      let oldParentStack = null;

      do {
        newStack = newStacks.pop();
        oldStack = oldStacks.pop();

        if (oldStack && (oldParentStack !== oldStack)) {
          oldParentStack = oldStack;
        }

        if (!oldStack) {
          console.log(111);
          if (newStack) {
            if (newStack.nodeType === 3) {
              if (newStack.parentNode) {
                if (oldParentStack.nodeType === newStack.parentNode.nodeType) {
                  oldParentStack.appendChild(newStack);
                }
              }
            }
          } else {
            // console.log('newStack 도 없는 상황');
          }
        }

        if (newStack?.nodeType !== oldStack?.nodeType) {
          console.log(111);
          console.dir(newStack);
          console.dir(oldStack);
          // oldStack.replaceWith(newStack);
        } else {
          if (newStack.nodeType === 3) {
            console.dir(oldStack.nodeValue);
            console.dir(newStack.nodeValue);
            if (newStack.nodeValue !== oldStack.nodeValue) {
              oldStack.replaceWith(newStack);
            }
          }
        }

        if (newStack && newStack.childNodes.length) {
          for (let i = 0; i < newStack.childNodes.length; i++) {
            const newElem = newStack.childNodes?.[i];
            const oldElem = oldStack.childNodes?.[i];

            newStacks.push(newElem);
            oldStacks.push(oldElem);
          }
        }
      }
      while (newStack);
    }

    return state.dom;
  };
}



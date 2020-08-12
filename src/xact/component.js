import Subject from '@rx/Subject';
import { toDom } from './utils/dom';
import StateManager from "./hooks/stateManager";
import createUseState from './hooks/createUseState';
import createUseEffect from './hooks/createUseEffect';
import createUseMemo from './hooks/createUseMemo';
import createUseCallback from './hooks/createUseCallback';
import createUseSelector from './hooks/createUseSelector';
import Store from './store';

export function component(createComponent) {
  return ({ props = {} } = {}) => {
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

    const render = () => {
      return createComponent({
        props,
        toDom,
        useState,
        useEffect,
        useMemo,
        useCallback,
        useSelector,
        dispatch,
      });
    };

    function observer() {
      let newDom = render();

      if (state.dom) {
        state.dom.replaceWith(newDom);
        // 이전에 등록된 DOM 이벤트들도 전부 가져와야한다.
        // 새롭게 바인딩된 이벤트 함수들은 새롭게 생성한 DOM에 바인딩되어있다.
        // newDom = replaceDomWithDiff(state.dom, newDom);
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

        console.log(newStack);
        if (!oldStack) {
          if (newStack) {
            if (newStack.nodeType === 3) {
              if (newStack.parentNode) {
                if (oldParentStack.nodeType === newStack.parentNode.nodeType) {
                  oldParentStack.appendChild(newStack);
                }
              }
            }
          } else {
            console.log('newStack 도 없는 상황');
          }
        }

        if (newStack?.nodeType !== oldStack?.nodeType) {
          oldStack.replaceWith(newStack);
        } else {
          if (newStack?.nodeType === 3) {
            if (newStack.nodeValue !== oldStack.nodeValue) {
              oldStack.replaceWith(newStack);
            }
          } else {
            oldStack.replaceWith(newStack);
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

      return prevDom;
    }

    return state.dom;
  };
}



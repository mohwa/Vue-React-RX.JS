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
        // state.dom.replaceWith(newDom);
        // 이전에 등록된 DOM 이벤트들도 전부 가져와야한다.
        // 새롭게 바인딩된 이벤트 함수들은 새롭게 생성한 DOM에 바인딩되어있다.
        // 이 부분을 구현하기위해서는, 별도 이벤트 시스템을 통해, 모든 이벤트들을 관리해야한다.
        newDom = replaceDomWithDiff(state.dom, newDom, event);
      }
      state.dom = newDom;
    }

    subject.subscribe({ next: observer });
    observer();


    function replaceDomWithDiff(prevDom, newDom, event) {
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
          }
        }

        if (newStack) {
          // 새롭게 생성한 이벤트들을 이전 node 에 다시 할당한다.
          // 다만 이전 노드(이미 EVENT 가 바인딩되었던 NODE 이기떄문에, 해당 이벤트가 중복을로 바인딩되는 문제가 있다)
          // 이 부분도 해결해야할듯하다.
          const events = event.events.get(newStack);

          if (events) {
            events.forEach((v) => {
              const { eventName, listener } = v;
              // console.log(oldStack, newStack, `on${eventName}`);
              oldStack[`on${eventName}`] = listener;
            });
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



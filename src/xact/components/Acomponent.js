import { events, query, replaceWith } from '../utils/dom.js';
import { component } from '../component.js';
import aActions from '../actions/aActions';
import bActions from '../actions/bActions';

export const Acomponent = component(({ props, toDom, useState, useEffect, useCallback, useSelector, dispatch }) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('INPUT VALUE');
  const aXState = useSelector(state => state.aReducer.x);
  const bYState = useSelector(state => state.bReducer.y);

  const onClick = useCallback(() => {
    setShow(!show);
  }, [show]);

  const addX = useCallback(() => {
    dispatch({ type: aActions.SET_X, payload: aXState + 1 });
  }, [aXState]);

  const subX = useCallback(() => {
    dispatch({ type: aActions.SET_X, payload: aXState - 1 });
  }, [aXState]);

  const addY = useCallback(() => {
    dispatch({ type: bActions.SET_Y, payload: bYState + 1 });
  }, [bYState]);

  const subY = useCallback(() => {
    dispatch({ type: bActions.SET_Y, payload: bYState - 1 });
  }, [bYState]);

  const Submit = useCallback((value) => {
    setValue(value);
  }, []);

  useEffect(() => {
    console.log('CHANGE PARENT', show);
  }, [show]);

  useEffect(() => {
    console.log('INIT PARENT');
  }, []);

  const dom = toDom(
    `<div>
      <div>${show}</div>
      <div>${aXState} / ${bYState}</div>
      <div>${value}</div>
      <button class="btn1">PARENT BUTTON CLICK</button>
      <button class="btn2">X ADD BUTTON CLICK</button>
      <button class="btn3">X SUB BUTTON CLICK</button>
      <button class="btn4">Y ADD BUTTON CLICK</button>
      <button class="btn5">Y SUB BUTTON CLICK</button>      
      <child-button></child-button>
      <child-input></child-input>
    </div>`
  );

  replaceWith(query(dom, 'child-button'), ChildButton({ props: { buttonName: 'CHILD BUTTON CLICK' }}));
  replaceWith(query(dom, 'child-input'), ChildInput({ props: { Submit }}));

  events(query(dom, '.btn1'), { click: onClick });
  events(query(dom, '.btn2'), { click: addX });
  events(query(dom, '.btn3'), { click: subX });
  events(query(dom, '.btn4'), { click: addY });
  events(query(dom, '.btn5'), { click: subY });

  return dom;
});

export const ChildButton = component(({ props, toDom, useState, useCallback, useEffect }) => {
  const [show, setShow] = useState(true);
  const [arr, setArr] = useState([]);

  console.log(arr);

  const onClick = useCallback(() => {
    setShow(!show);
    setArr([show, show]);
  }, [show, arr]);

  useEffect(() => {
    console.log('CHANGE CHILD', show);
  }, [show]);

  useEffect(() => {
    console.log('INIT CHILD');
  }, []);

  const dom = toDom(
    `<div>
       <div>${show}, ${`[${String(arr)}]`}</div>
       <button type="button">${props.buttonName}</button>
     </div>`
  );

  events(query(dom, 'button'), { click: onClick });

  return dom;
});

export const ChildInput = component(({ props, toDom, useState, useCallback }) => {
  const [value, setValue] = useState('');

  const onInput = useCallback((value) => {
    setValue(value);
  }, []);

  const dom = toDom(
    `<div>
       <input type="text" />
       <button>제출</button>
       <div>${value}</div>
     </div>`
  );

  const inputElem = query(dom, 'input');

  events(inputElem, {
    input: (e) => onInput(e.target.value),
  });

  events(query(dom, 'button'), {
    click: () => {
      props.Submit(inputElem.value);
    }
  });

  return dom;
});

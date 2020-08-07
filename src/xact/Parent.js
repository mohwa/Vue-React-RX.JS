import {events, query, replaceWith } from './dom.js';
import { component } from './Component.js';

export const Parent = component(({ props, toDom, useState, useEffect, useCallback }) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('INPUT VALUE');

  const onClick = useCallback(() => {
    setShow(!show);
  }, [show]);

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
      <div>${value}</div>
      <button>PARENT BUTTON CLICK</button>
      <child-button></child-button>
      <child-input></child-input>
    </div>`
  );

  replaceWith(query(dom, 'child-button'), ChildButton({ props: { buttonName: 'CHILD BUTTON CLICK' }}));
  replaceWith(query(dom, 'child-input'), ChildInput({ props: { Submit }}));

  events(query(dom, 'button'), { click: onClick });

  return dom;
});

export const ChildButton = component(({ props, toDom, useState, useCallback, useEffect }) => {
  const [show, setShow] = useState(true);
  const [arr, setArr] = useState([]);

  const onClick = useCallback(() => {
    setShow(!show);
    setArr([show, show]);
  }, [show, arr]);

  useEffect(() => {
    console.log('CHANGE CHILD', show, arr);
  }, [show, arr]);

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
    click: () => props.Submit(inputElem.value),
  });

  return dom;
});

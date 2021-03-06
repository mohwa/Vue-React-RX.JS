import { query, replaceWith } from '../utils/dom.js';
import { component } from '../component.js';
import aActions from '../actions/aActions';
import bActions from '../actions/bActions';

export const AComponent = component(({ props, toDOM }, { useState, useEffect, useCallback, useSelector, dispatch, event }) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('INPUT VALUE');
  const aXState = useSelector(state => state.aReducer.x);
  const bYState = useSelector(state => state.bReducer.y);
  const [displayValue, setDisplayValue] = useState('none');

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

  const showTest = useCallback(() => {
    if (displayValue === 'none') {
      setDisplayValue('block');
    } else {
      setDisplayValue('none');
    }
  }, [displayValue]);

  const Submit = useCallback((value) => {
    setValue(value);
  }, []);

  useEffect(() => {
    console.log('CHANGE PARENT', show);
  }, [show]);

  const dom = toDOM(
    `<div>
      <div>${show}</div>
      <div>${aXState} / ${bYState}</div>
      <div>${value}</div>
      <button class="btn1">PARENT BUTTON CLICK</button>
      <button class="btn2">X ADD BUTTON CLICK</button>
      <button class="btn3">X SUB BUTTON CLICK</button>
      <button class="btn4">Y ADD BUTTON CLICK</button>
      <button class="btn5">Y SUB BUTTON CLICK</button>
      <button class="btn6">SHOW DISPLAY</button>
      <div class="show-test" style="display:${displayValue}">TEST</div>  
      <child-button></child-button>
      <child-input></child-input>
    </div>`
  );

  event.bind(query(dom, '.btn1'), { click: onClick });
  event.bind(query(dom, '.btn2'), { click: addX });
  event.bind(query(dom, '.btn3'), { click: subX });
  event.bind(query(dom, '.btn4'), { click: addY });
  event.bind(query(dom, '.btn5'), { click: subY });

  const btn6El = query(dom, '.btn6');
  event.bind(btn6El, { click: showTest });

  replaceWith(query(dom, 'child-button'), ChildButton({ props: { buttonName: 'CHILD BUTTON CLICK' }}));
  replaceWith(query(dom, 'child-input'), ChildInput({ props: { Submit }}));

  return dom;
});

export const ChildButton = component(({ props, toDOM }, { useState, useEffect, useCallback, event }) => {
  const [show, setShow] = useState(true);

  const onClick = useCallback(() => {
    console.log(1);
    setShow(!show);
  }, [show]);

  useEffect(() => {
    console.log('CHANGE CHILD', show);
  }, [show]);

  useEffect(() => {
    console.log('INIT CHILD');
  }, []);

  const dom = toDOM(
    `<div>
      <div>${show}</div>
      <button type="button">${props.buttonName}</button>
      ${(() => {
        if (show) {
          return '<div>TEST2</div>';
        } else {
          return '<div>TEST3</div>';
        }
      })()}       
     </div>`
  );

  event.bind(query(dom, 'button'), { click: onClick });

  return dom;
});

export const ChildInput = component(({ props, toDOM }, { useState, useEffect, useCallback, event }) => {
  const [value, setValue] = useState('');

  const onInput = useCallback((value) => {
    setValue(value);
  }, []);

  const dom = toDOM(
    `<div>
       <input type="text" />
       <button>선택</button>
       <div>${value}</div>
     </div>`
  );

  event.bind(query(dom, 'input'), {
    input: (e) => onInput(e.target.value),
  });

  event.bind(query(dom, 'button'), {
    click: (e) => {
      props.Submit(e.target.previousElementSibling.value);
    }
  });

  return dom;
});

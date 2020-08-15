import Store from './store';
import reducers from './reducers';

import { append } from './utils/dom.js';
import { AComponent } from './components/AComponent';

Store.createStore(reducers);

const app = document.querySelector('#app');

append(app, AComponent());

// let i = 0;
//
// function* test() {
//   let v = yield sleep(1000);
//   console.log(v);
//   v = yield sleep(2000);
//   console.log(v);
//   v = yield sleep(3000);
//   console.log(v);
// }
//
// function sleep(timeout) {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(i++), timeout);
//   });
// }
//
// function executor(generator) {
//   const iterator = generator();
//
//   const next = ({ value, done }) => {
//     if (!done) {
//       value.then((vv) => next(iterator.next(vv)));
//     }
//   };
//
//   next(iterator.next());
// }
//
//
// executor(test);

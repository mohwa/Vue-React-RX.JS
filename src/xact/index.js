import Store from './store';
import reducers from './reducers';

import { append } from './utils/dom.js';
import { Acomponent } from './components/Acomponent';

Store.createStore(reducers);

const app = document.querySelector('#app');

append(app, Acomponent());

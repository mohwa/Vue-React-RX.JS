import Vuex from '@vue/Vuex';

export default Vuex.Store({
  state: {
    count: 1,
  },
  modules: {
    x: {
      xx: 1,
    },
    y: {
      xx: 2,
    }
  }
});

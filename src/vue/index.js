import Vue from '@vue/Vue';
import store from '@vue/store';

const X = {
  template: `<div>X</div>`,
};

const Y = {
  template: `<div>Y</div>`,
};

const Z = {
  template: `<div>Z</div>`,
};

const ZZ = {
  template: `<div>ZZ</div>`,
};

Vue.component('x', X);
Vue.component('y', Y);

// const vm = new Vue({
//   el: '#app'
// });

const vm = new Vue({
  data: {
    x: 1,
  },
  computed: {
    xx: () => {
      return this.x  + 2;
    }
  },
  template: '<div><span><div><x></x></div><y></y></span><span><z></z></span><div><zz></zz></div></div>',
  components: {
    'z': Z,
    'zz': ZZ,
  },
});

vm.$mount('#app');

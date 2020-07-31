import Vue from '@vue/Vue';
import store from '@vue/store';

const X = {
  template: `<span>X<span>`,
};

const Y = {
  template: `<div>Y<span>x<x></x></span></div>`,
  components: {
    x: X,
  }
};

const Z = {
  template: `<div>Z</div>`,
};

const Z1 = {
  template: `<div>Z1</div>`,
};

const Z2 = {
  template: `<div>Z2<y></y></div>`,
  components: {
    y: Y,
  }
};

const ZZ = {
  template: `<div>ZZ<z1></z1><z2></z2><y></y></div>`,
  components: {
    z1: Z1,
    z2: Z2,
    y: Y,
  }
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
      return this.x + 2;
    }
  },
  template: '<span><span><z></z><zz></zz></span></span>',
  components: {
    'z': Z,
    'zz': ZZ,
  },
});

vm.$mount('#app');

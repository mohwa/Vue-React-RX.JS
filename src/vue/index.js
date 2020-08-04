import Vue from '@vue/Vue';
import store from '@vue/store';

const X = {
  template: () => `<span>X<span>`,
};

const Y = {
  template: () => `<div>Y<span>x<x></x></span></div>`,
  components: {
    x: X,
  }
};

const Z = {
  template: () => `<div>Z</div>`,
};

const Z1 = {
  template: () => `<div>Z1</div>`,
};

const Z2 = {
  template: () => `<div>Z2<y></y></div>`,
  components: {
    y: Y,
  }
};

const ZZ = {
  template: () => {
    return `<div>ZZ<z1></z1><z1></z1><z1></z1><z2></z2><y></y></div>`;
  },
  components: {
    z1: Z1,
    z2: Z2,
    y: Y,
  }
};

Vue.component('x', X);
Vue.component('x', X);
Vue.component('y', Y);

// const vm = new Vue({
//   el: '#app'
// });

const vm = new Vue({
  data: {
    x: 1,
    y: 2,
  },
  computed: {
    xx: {
      get() {
        return this.x + 5;
      },
      set(v) {
        return this.x + v;
      }
    },
    yy: {
      get() {
        console.log(this);
        return this.y + 5;
      },
      set(v) {
        return this.y + v;
      }
    }
  },
  methods: {
    plus() {
      console.log(31231231, this);
      this.x++;
    }
  },
  template() {
    setTimeout(() => {
      this.x = 333;
    }, 1000);

    return `<span>${this.x} / ${this.xx}<span><z></z><z1></z1><z1></z1><zz></zz></span></span>`;
  },
  components: {
    'z': Z,
    'zz': ZZ,
    'z1': Z1,
  },
});

console.log(vm);
// vm.plus();
// vm.options.data.x = 2;

console.log(vm.x);

// vm.x = 2;
// console.log('vm.xx', vm.xx);
// vm.xx = 3;


vm.$mount('#app');

import Vue from 'vue'
import App from './App.vue'

import ons from 'onsenui/esm';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import VueOnsen from 'vue-onsenui';

Vue.use(VueOnsen);

new Vue({
  el: '#app',
  render: h => h(App)
})

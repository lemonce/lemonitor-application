'use strict';

import './global.less';
import './component/global/index';

import axios from 'axios';
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import bFormSlider from 'vue-bootstrap-slider';
import VueTimepicker from 'vue-timepicker-remastered';
import dateFormat from 'dateformat';

import menu from './menu.js';
import Data from './plugin/data.js';

Vue.use(VeeValidate);
Vue.use(bFormSlider);
Vue.use(VueTimepicker, { name: 'timepicker' });
Vue.use(Data);

import App from './component/App.vue';

import router from './routes';
import store from './store/index.js';
import i18n from './i18n/index.js';

const $app = new Vue(Object.assign({ i18n, router, store }, App));


export default { router, store, i18n, menu };

window.addEventListener('load', () => {
	$app.$mount('#app');
});

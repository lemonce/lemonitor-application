'use strict';

import axios from 'axios';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);
Vue.use(VueRouter);

import App from './component/App.vue';

import routes from './routes';

const router = new VueRouter({ routes });
const $app = new VueRouter(Object.assign({ router }, App));

export default { router }
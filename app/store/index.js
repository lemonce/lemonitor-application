'use strict';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import menu from './module/menu';

const store = new Vuex.Store({
	modules: { menu },
	state: {

	}
});

export default store;

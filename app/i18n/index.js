'use strict';

import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

import en from './en.yaml';
import zh from './zh.yaml';

const messages = { en, zh };

export default new VueI18n({
	locale: 'zh',
	messages
})
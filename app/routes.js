'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from './component/Home.vue';

import Welcome from './component/route/Welcome.vue';
import Notification from './component/route/Notification.vue';
import Config from './component/route/Config.vue';
import Statistics from './component/route/overview/Statistics.vue';
import About from './component/route/overview/About.vue';

import Signin from './component/route/account/Signin.vue';
import Signup from './component/route/account/Signup.vue';

const routes = [
	{
		path: '/',
		component: Home,
		meta: {
			requireAccount: true
		},
		children: [
			{
				path: 'welcome',
				alias: '',
				component: Welcome
			},
			{
				path: 'notification',
				component: Notification
			},
			{
				path: 'config',
				component: Config
			},
			{
				path: 'statistics',
				component: Statistics
			},
			{
				path: 'about',
				component: About
			},
			{
				path: 'profile'
			}
		]
	},
	
	{
		path: '/account/signin',
		component: Signin,
		meta: {
			requireAccount: false
		},
	},
	{
		path: '/account/signup',
		component: Signup,
		meta: {
			requireAccount: false
		},
	}
];

const router = new VueRouter({
	routes
});

export default router;
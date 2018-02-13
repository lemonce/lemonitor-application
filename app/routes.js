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

import Login from './component/Login.vue';

const routes = [
	{
		path: '/',
		alias: '/home',
		component: Home,
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
			}
		]
	},
	
	{
		path: '/login',
		component: Login
	}
];

const router = new VueRouter({
	routes
});

router.beforeEach((to, from, next) => {
	if (to.path === '/' || to.path === '/home') {
		if (!router.app.$store.state.user.isLogin) {
			router.push({
				path: '/login'
			})
		};
	}
	
	if (to.path === '/login') {
		if (router.app.$store.state.user.isLogin) {
			router.push({
				path: '/home'
			})
		};

		console.log(router.app)
	}
	
	next();
});

export default router;
'use strict';

import Home from './component/route/Home.vue';
import Notification from './component/route/Notification.vue';
import Config from './component/route/Config.vue';

import Statistics from './component/route/overview/Statistics.vue';
import About from './component/route/overview/About.vue';
import ClientFlag from './component/route/overview/Client.vue';
import UserFlag from './component/route/overview/User.vue';

export default [
	{
		path: '/',
		alias: '/home',
		component: Home
	},
	{
		path: '/notification',
		component: Notification
	},
	{
		path: '/config',
		component: Config
	},
	{
		path: '/statistics',
		component: Statistics
	},
	{
		path: '/about',
		component: About
	},
	{
		path: '/flag/client',
		component: ClientFlag
	},
	{
		path: '/flag/client/:id/user',
		component: UserFlag
	}
]
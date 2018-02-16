<template>
<router-view></router-view>
</template>

<script>
import axios from 'axios';

const signInPath = '/account/signin';
const CHECK_INTERVAL = 5 * 60 * 1000;

export default {
	methods: {
		updateSession() {
			return axios.get('/api/noop', {
				timeout: 10000
			}).then(res => {
				const newId = res.data.data.account;
				const oldId = this.$store.state.account.id;

				this.$store.commit('account/updateAccount', newId);

				return { oldId, newId };
			});
		}
	},
	beforeMount() {
		this.updateSession();

		this.watcher = setInterval(this.updateSession, CHECK_INTERVAL);

		this.$router.beforeEach((to, from, next) => {
			this.updateSession().then(({ oldId, newId }) => {
				const requireAccount =
					to.matched.some(record => record.meta.requireAccount);

				if (newId) {
					if (!requireAccount) {
						next('/');
					}
				} else {
					if (requireAccount) {
						next('/login');
					}
				}

				next();
			}, () => {
				//TODO 处理连接错误
				console.log('连接错误');

				next(false);
			});
		});

		const http = axios.create();

		// http.interceptors.response.use(function (response) {
		// 	return response;
		// }, originalError => {
		// 	this.updateSession().catch(error => {
		// 		if (error.request) {
		// 		console.log(error.request);
		// 		}
		// 	});

		// 	return Promise.reject(originalError);
		// });

		this.$Data.registerHelper('http', http);
	},
	destroyed() {
		clearInterval(this.watcher);
	}
};
</script>

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
				const accountId = res.data.data.account;

				this.$store.commit('account/updateAccount', accountId);

				return accountId;
			}, () => {
				//TODO 处理连接错误
				console.log('连接错误');

				next(false);
			});
		}
	},
	mounted() {

		this.watcher = setInterval(this.updateSession, CHECK_INTERVAL);

		this.$router.beforeEach((to, from, next) => {
			this.updateSession().then((accountId) => {
				const requireAccount =
					to.matched.some(record => record.meta.requireAccount);

				console.log(requireAccount, to, accountId)

				if (accountId) {
					if (!requireAccount) {
						return next('/');
					}
				} else {
					if (requireAccount) {
						return next(signInPath);
					}
				}

				next();
			});
		});
	},
	beforeMount() {
		const http = axios.create();

		this.$Data.registerHelper('http', http);
	},
	destroyed() {
		clearInterval(this.watcher);
	}
};
</script>

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
			});
		},
		catchConnectionError() {
			//TODO 处理连接错误
			console.log('连接错误');
		}
	},
	mounted() {
		this.$Data.setAutoUpdate(this.$store.getters['range/isDynamicDuration']);

		this.watcher = setInterval(() => {
			this.updateSession().catch(this.catchConnectionError);
		}, CHECK_INTERVAL);

		this.$router.beforeEach((to, from, next) => {
			this.updateSession().then((accountId) => {
				const requireAccount =
					to.matched.some(record => record.meta.requireAccount);

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
			}, this.catchConnectionError);
		});
	},
	destroyed() {
		clearInterval(this.watcher);
	}
};
</script>

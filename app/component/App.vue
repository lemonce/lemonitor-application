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

				if (!accountId) {
					this.$router.push({ path: signInPath });
				}

				return Boolean(accountId);
			}, () => {
				//TODO 处理连接错误
				console.log('连接错误');
			});
		}
	},
	mounted() {
		this.updateSession();

		this.watcher = setInterval(this.updateSession, CHECK_INTERVAL);

		axios.interceptors.response.use(function (response) {
			return response;
		}, err => {
			this.updateSession();

			return Promise.reject(err);
		});
	},
	destroyed() {
		clearInterval(this.watcher);
	}
};
</script>

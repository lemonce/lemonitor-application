'use strict';
import axios from 'axios';

export default {
	namespaced: true,
	state: {
		signedIn: false,
		accountId: -1
	},
	actions: {
		signIn({ commit }, { name, password }) {
			return axios.post('/api/account/session', {
				name, password
			}).then(({data}) => {
				commit('updateAccount', data.data.accountId);
			});
		},
		signOut({ commit }) {
			return axios.delete('/api/account/session').then(() => {
				commit('updateAccount');
			});
		}
	},
	mutations: {
		updateAccount(state, accountId = null) {
			state.accountId = accountId;
			state.signedIn = Boolean(accountId);
		}
	}
};
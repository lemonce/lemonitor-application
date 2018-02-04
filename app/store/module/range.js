'use strict';

const HOUR = 60 * 60 * 1000;

export default {
	namespaced: true,
	getters: {
		from(state, getters) {
			if (state.from.type === 'moment') {
				return state.from.value;
			}

			if (state.from.type === 'duration') {
				return getters.to - state.from.value;
			}

		},
		to(state) {
			if (state.to.type === 'now') {
				return state.now;
			}
			
			if (state.to.type === 'moment') {
				return state.to.value;
			}
		},
		isDynamicDuration(state) {
			return state.to.type === 'now';
		},
		isIllegal(state, {from, to}) {
			return to - from < 0;
		}
	},
	state: {
		from: {
			type: 'duration',
			value: HOUR
		},
		to: {
			type: 'now',
			value: null
		},
		now: Date.now()
	},
	actions: {
		setFrom({commit}, { type, value }) {
			if (type === 'moment') {
				return commit('setFromMoment', value);
			}

			if (type === 'duration') {
				return commit('setDuration', value);
			}
		},
		setTo({commit}, { type, value }) {
			if (type === 'moment') {
				return commit('setToMoment', value);
			}

			if (type === 'now') {
				return commit('setToNow');
			}
		},
		updateNow({commit}) {
			commit('setNow');
		}
	},
	mutations: {
		setNow(state) {
			state.now = Date.now();
		},
		setFromMoment(state, timestamp) {
			state.from.type = 'moment';
			state.from.value = timestamp;
		},
		setToMoment(state, timestamp) {
			state.to.type = 'moment';
			state.to.value = timestamp;

			if (state.from.type === 'duration') {
				state.from.type = 'moment';
				state.from.value = timestamp - state.from.value;
			}
		},
		setDuration(state, duration) {
			if (state.to.type === 'now') {
				state.from.type = 'duration';
				state.from.value = duration;
			}

			if (state.to.type === 'moment') {
				state.from.type = 'moment';
				state.from.value = state.to.value - duration;
			}
		},
		setToNow(state) {
			state.to.type = 'now';
			state.to.value = null;
		}
	}
};
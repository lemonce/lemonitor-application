'use strict';
const RANGE_ENSURE_INTERVAL = 2000;

export default {
	data() {
		return {
			throttleTimer: null
		};
	},
	mounted() {
		this.$on('apply', () => {
			this.throttleTimer = setTimeout(() => {
				clearTimeout(this.throttleTimer);
				
				this.throttleTimer = null;

				const isDynamic = this.$store.getters['range/isDynamicDuration'];

				this.$Data.setAutoUpdate(isDynamic);
				this.$Data.forceUpdateAll();
			}, RANGE_ENSURE_INTERVAL);
		});
	}
};
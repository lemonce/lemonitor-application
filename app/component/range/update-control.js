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

				this.$Data.stopAll();
				this.$Data.updateAll();

				if (this.$store.getters['range/isDynamicDuration']) {
					this.$Data.startAll();
				}
			}, RANGE_ENSURE_INTERVAL);
		})
	}
}
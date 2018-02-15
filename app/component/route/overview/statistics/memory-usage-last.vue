<template>
<metric-card :title="$t('statistics.memory')">
	<chart-gauge :min="0" :max="100" :unit="'%'"
		:value="memoryUsage"></chart-gauge>
</metric-card>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			memoryUsage: this.$Data(0, () => {
				return axios("/api/status/memory/state").then(({ data }) => {
					this.memoryUsage = Number((data.data[0] * 100).toFixed(1));
				});
			}, 60 * 1000)
		}
	}
}
</script>
<template>
<metric-card :title="$t('statistics.cpu')">
	<chart-gauge :min="0" :max="100" :unit="'%'"
		:value="cpuUsage"></chart-gauge>
</metric-card>
</template>

<script>
export default {
	data() {
		return {
			cpuUsage: this.$Data(0, ({ http }) => {
				return http("/api/status/cpu/state").then(({ data }) => {
					this.cpuUsage = Number((data.data[0] * 100).toFixed(1));
				});
			}, 60 * 1000)
		}
	}
}
</script>
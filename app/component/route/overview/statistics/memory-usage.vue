<template>
<metric-card :title="$t('statistics.memory')">
	<chart-linear :series="[{
		type: 'area',
		name: 'Memory Usage',
		data: memoryUsage
	}]"
	:xAxis="{ type: 'datetime' }"
	:yAxis="[{
		labels: {
			format: '{value}%'
		}
	}]"></chart-linear>
</metric-card>
</template>

<script>
export default {
	data() {
		const memoryUsage = this.$Data([], (http) => {
			return http(`/api/status/memory/log`, { 
				params: {
					from: new Date(this.$store.getters['range/from']),
					to: new Date(this.$store.getters['range/to'])
				}
			}).then(({data}) => {
				this.memoryUsage = data.data.dataset;
			});
		}, 60 * 1000);

		return { memoryUsage };
	}
};
</script>


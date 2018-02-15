<template>
<metric-card :title="$t('statistics.cpu')">
	<chart-linear
		:xAxis="{ type: 'datetime' }"
		:yAxis="[{
			labels: {
				format: '{value}%'
			}
		}]"
		:series="[{
			type: 'areaspline',
			name: 'Cpu Usage',
			data: cpuUsage
		}]"></chart-linear>
</metric-card>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		const cpuUsage = this.$Data([], () => {
			return axios(`/api/status/cpu/log`, { 
				params: {
					from: new Date(this.$store.getters['range/from']),
					to: new Date(this.$store.getters['range/to'])
				}
			}).then(({data}) => {
				this.cpuUsage = data.data.dataset;
			});
		}, 60 * 1000);

		return { cpuUsage };
	}
};
</script>

<template>
	<highcharts :options="mixedOptions"></highcharts>
</template>

<script>
import Highcharts from '../Highcharts.vue';

export default {
	name: 'chart-pie',
	components: { Highcharts },
	props: {
		series: {
			type: Array,
			required: true,
			default() {
				return [{
					type: 'pie',
					data: [],
					innerSize: null
				}];
			}
		}
	},
	computed: {
		mixedOptions() {
			return Object.assign({}, {
				series: this.series
			});
		}
	}
}
</script>
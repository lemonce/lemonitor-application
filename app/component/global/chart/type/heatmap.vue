<template>
	<highcharts :options="mixedOptions"></highcharts>
</template>

<script>
import Highcharts from '../Highcharts.vue';

export default {
	name: 'chart-heatmap',
	components: { Highcharts },
	props: {
		series: {
			type: Array,
			required: true,
			default() {
				return [{
					type: 'heatmap',
					data: []
				}];
			}
		},
		xAxis: {
			type: Object,
			default() {
				return {};
			}
		},
		yAxis: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	computed: {
		mixedOptions() {
			return Object.assign({}, {
				series: this.series,
				xAxis: Object.assign({}, this.xAxis),
				yAxis: Object.assign({}, this.yAxis)
			});
		}
	}
}
</script>
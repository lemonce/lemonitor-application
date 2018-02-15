<template>
	<highcharts :options="mixedOptions"></highcharts>
</template>

<script>
import Highcharts from '../Highcharts.vue';

const defaultAxis = {
	crosshair: {
		width: 1,
		color: '#999'
	}
}

export default {
	name: 'chart-line',
	components: { Highcharts },
	props: {
		series: {
			type: Array,
			required: true,
			default() {
				return [{
					type: 'line',
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
			type: Array,
			default() {
				return [];
			}
		}
	},
	computed: {
		mixedOptions() {
			return Object.assign({}, {
				tooltip: {
					crosshairs: true,
					shared: true,
					valueSuffix: '%'
				},
				series: this.series,
				xAxis: Object.assign({}, defaultAxis, this.xAxis),
				yAxis: this.yAxis
			});
		}
	}
}
</script>
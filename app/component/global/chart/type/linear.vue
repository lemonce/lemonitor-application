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
		xAixs: {
			type: Object,
			default() {
				return {};
			}
		},
		yAixs: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	computed: {
		mixedOptions() {
			return Object.assign({}, {
				series: this.series,
				xAixs: Object.assign({}, defaultAxis, this.xAixs),
				yAixs: this.yAixs
			});
		}
	}
}
</script>
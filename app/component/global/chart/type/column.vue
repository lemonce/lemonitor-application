<template>
	<highcharts :options="mixedOptions"></highcharts>
</template>

<script>
import Highcharts from '../Highcharts.vue';

export default {
	name: 'chart-column',
	components: { Highcharts },
	props: {
		series: {
			type: Array,
			required: true,
			default() {
				return [{
					type: 'column',
					data: [],
					color: undefined
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
				xAixs: Object.assign({}, this.xAixs),
				yAixs: this.yAixs
			});
		}
	}
}
</script>
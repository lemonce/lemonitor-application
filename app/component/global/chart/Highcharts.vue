<template>
<div class="highcharts" style="height:175px"></div>
</template>

<script>
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge';

HighchartsMore(Highcharts);
SolidGauge(Highcharts);

export default {
	name: 'highcharts',
	props: {
		options: {
			type: Object,
			required: true,
			default() {
				return {};
			}
		}
	},
	mounted() {
		this.chart = new Highcharts.Chart(this.$el, this.options);
	},
	methods: {
		renderer() {
			this.chart.update(this.options);
		}
	},
	watch: {
		options() {
			this.renderer();
		}
	},
	beforeDestroy() {
		this.chart.destroy();
	}
}
</script>

<template>
	<highcharts :options="mixedOptions"></highcharts>
</template>

<script>
import Highcharts from '../Highcharts.vue';

const defaultOptions = {
	chart: {
		type: 'solidgauge'
	},
	pane: {
		center: ['50%', '85%'],
		size: '160%',
		startAngle: -90,
		endAngle: 90,
		background: {
			backgroundColor: '#F6F6F6',
			innerRadius: '60%',
			outerRadius: '100%',
			shape: 'arc'
		}
	},
    plotOptions: {
        solidgauge: {
            dataLabels: {
                y: 5,
                borderWidth: 0,
                useHTML: true
            }
        }
    },
	tooltip: {
		enabled: false
	}
};

const defaultYAxisOptions = {
	stops: [
		[0.1, '#50B432'], //green
		[0.5, '#DDDF00'], //yellow
		[0.9, '#ED561B'] //red
	],
	lineWidth: 0,
	minorTickInterval: null,
	tickPixelInterval: 400,
	tickWidth: 0,
	title: {
		y: -70
	},
	labels: {
		y: 16
	}
};

export default {
	name: 'chart-gauge',
	components: { Highcharts },
	props: {
		value: {
			type: Number,
			required: true,
			default() {
				return {};
			}
		},
		min: {
			type: Number,
			required: true
		},
		max: {
			type: Number,
			required: true
		},
		unit: {
			type: String,
			default() {
				return '';
			}
		}
	},
	computed: {
		mixedOptions() {
			return Object.assign({}, defaultOptions, {
				series:[
					{
						name: 'speed',
						data: [this.value],
						dataLabels: {
							format: `<span style="font-size:18px">{y}</span> ${this.unit}`
						}
					}
				],
				yAxis: Object.assign({}, defaultYAxisOptions, {
					min: this.min,
					max: this.max
				})
			});
		}
	}
};
</script>
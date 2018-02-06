'use strict';

import Highcharts from 'highcharts';

Highcharts.setOptions(Highcharts.theme = {
	accessibility: {
		enabled: false
	},
	exporting: {
		enabled: false
	},
	title: {
		text: null
	},
	subtitle: {
		text: null
	},
	credits: {
		enabled: false
	},
	colors: [
		'#058DC7', '#50B432', '#ED561B',
		'#24CBE5', '#DDDF00', '#64E572',
		'#FF9655', '#FFF263', '#6AF9C4'
	],
	chart: {
		animation: false,
		backgroundColor: 'transparent'
	},

	plotOptions: {
		series: {
			fillColor: {
				linearGradient: [ 0, 0, 0, 300 ],
				stops: [
					[ 0, Highcharts.Color(Highcharts.setOptions().colors[0]).setOpacity(0.5).get('rgba') ],
					[ 1, Highcharts.Color(Highcharts.setOptions().colors[0]).setOpacity(0).get('rgba') ]
				]
			},
			lineWidth: 1,
			states: {
				hover: {
					lineWidth: 1
				}
			},
			marker: {
				enabled: false
			}
		},
		solidgauge: {
			dataLabels: {
				y: 5,
				borderWidth: 9,
				useHTML: true
			}
		},
		pie: {
			dataLabels: {
				style: {
					color: '#555',
					fontSize: '14px',
					fontFamily: 'Trebuchet MS, Verdana, sans-serif'
				}
			}
		},
		area: {},
		line: {},
		column: {},

	},

	xAxis: {
		gridLineWidth: 1,
		lineColor: '#aaa',
		tickColor: '#aaa',
		lineWidth: 1,
		labels: {
			style: {
				color: '#555',
				font: '14px Trebuchet MS, Verdana, sans-serif'
			}
		},
		title: {
			style: {
				color: '#333',
				fontWeight: 'bold',
				fontSize: '12px',
				fontFamily: 'Trebuchet MS, Verdana, sans-serif'
			}
		}
	},
	yAxis: {
		minorTickInterval: 'auto',
		lineColor: '#aaa',
		lineWidth: 1,
		tickWidth: 1,
		tickColor: '#aaa',
		labels: {
			style: {
				color: '#555',
				font: '14px Trebuchet MS, Verdana, sans-serif'
			}
		},
		title: {
			text: null
		}
	},

	legend: {
		align: 'right',
		verticalAlign: 'top',
		floating: true,
		itemStyle: {
			font: '9pt Microsoft Yahei, Trebuchet MS, Verdana, sans-serif',
			color: 'black'
		},
		itemHoverStyle: {
			color: '#039'
		},
		itemHiddenStyle: {
			color: 'gray'
		}
	},

	labels: {
		style: {
			color: '#99B'
		}
	}

})
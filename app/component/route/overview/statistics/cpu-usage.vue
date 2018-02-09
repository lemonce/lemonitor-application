<template>
<metric-card :title="$t('statistics.cpu')">
	<chart-linear :series="[{
		type: 'area',
		name: 'Memory Usage Per 1 Hour',
		data: [23, 12, 34, 35, 26]
	}]"
	:xAxis="{ type: 'datetime' }"
	:yAxis="[{
		labels: {
			format: '{value}%'
		}
	}]"></chart-linear>
</metric-card>
</template>

<template>
<metric-card :title="$t('statistics.memory')">
	<chart-linear :series="[{
		type: 'area',
		name: 'Memory Usage Per 1 Hour',
		data: [34, 65, 34, 67, 34]
	}]"
	:xAxis="{ type: 'datetime' }"
	:yAxis="[{
		labels: {
			format: '{value}%'
		}
	}]"></chart-linear>
</metric-card>
</template>

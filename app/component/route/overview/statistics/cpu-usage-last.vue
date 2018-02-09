<template>
<metric-card :title="$t('statistics.cpu')">
	<chart-gauge :min="0" :max="100" :unit="'%'"
		:value="12"></chart-gauge>
</metric-card>
</template>

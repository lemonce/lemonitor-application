<template>
<metric-card :title="$t('statistics.memory')">
	<chart-gauge :min="0" :max="100" :unit="'%'"
		:value="45"></chart-gauge>
</metric-card>
</template>

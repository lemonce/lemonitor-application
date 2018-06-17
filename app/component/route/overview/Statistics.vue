<template>
<div id="statistics">
	<!-- <b-row>
		<b-col md="6" lg="3">
			<running-timming></running-timming>
		</b-col>
		<b-col md="6" lg="3">
			<active-session></active-session>

		</b-col>
		<b-col md="6" lg="3">
			<cpu-usage-last></cpu-usage-last>

		</b-col>
		<b-col md="6" lg="3">
			<memory-usage-last></memory-usage-last>
			
		</b-col>
	</b-row> -->

	<cpu-usage></cpu-usage>

	<memory-usage></memory-usage>
</div>
</template>

<script>
// import CpuUsageLast from "./statistics/cpu-usage-last.vue";
import CpuUsage from "./statistics/cpu-usage.vue";
// import MemoryUsageLast from "./statistics/memory-usage-last.vue";
import MemoryUsage from "./statistics/memory-usage.vue";
// import RunningTimming from "./statistics/running-timming.vue";
// import ActiveSession from "./statistics/session.vue";

export default {
	components: {
		// CpuUsageLast,
		CpuUsage,
		// MemoryUsageLast,
		MemoryUsage,
		// RunningTimming,
		// ActiveSession
	}
};
</script>
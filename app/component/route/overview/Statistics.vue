<template>
<div id="statistics">
	<div class="row">
		<div class="col-md-6 col-lg-3">
			<running-timming></running-timming>
		</div>
		<div class="col-md-6 col-lg-3">
			<active-session></active-session>

		</div>
		<div class="col-md-6 col-lg-3">
			<cpu-usage-last></cpu-usage-last>

		</div>
		<div class="col-md-6 col-lg-3">
			<memory-usage-last></memory-usage-last>
			
		</div>
	</div>

	<cpu-usage></cpu-usage>

	<memory-usage></memory-usage>
</div>
</template>

<script>
import CpuUsageLast from "./statistics/cpu-usage-last.vue";
import CpuUsage from "./statistics/cpu-usage.vue";
import MemoryUsageLast from "./statistics/memory-usage-last.vue";
import MemoryUsage from "./statistics/memory-usage.vue";
import RunningTimming from "./statistics/running-timming.vue";
import ActiveSession from "./statistics/session.vue";

export default {
	components: {
		CpuUsageLast,
		CpuUsage,
		MemoryUsageLast,
		MemoryUsage,
		RunningTimming,
		ActiveSession
	}
};
</script>
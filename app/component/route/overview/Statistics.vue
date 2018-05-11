<template>
<div id="statistics">
	<!-- <div class="row">
		<div class="col-md-6 col-lg-3">
			<running-timming class="my-1"></running-timming>
		</div>
		<div class="col-md-6 col-lg-3">
			<active-session class="my-1"></active-session>
		</div>
		<div class="col-md-6 col-lg-3">
			<cpu-usage-last class="my-1"></cpu-usage-last>
		</div>
		<div class="col-md-6 col-lg-3">
			<memory-usage-last class="my-1"></memory-usage-last>
		</div>
	</div> -->

	<cpu-usage class="my-3"></cpu-usage>

	<memory-usage class="my-3"></memory-usage>
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
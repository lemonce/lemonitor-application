<template>
<div id="statistics">
	<el-row :gutter="20">
		<el-col :md="12" :lg="6">
			<running-timming style="margin: .5rem 0"></running-timming>
		</el-col>
		<el-col :md="12" :lg="6">
			<active-session style="margin: .5rem 0"></active-session>
		</el-col>
		<el-col :md="12" :lg="6">
			<cpu-usage-last style="margin: .5rem 0"></cpu-usage-last>
		</el-col>
		<el-col :md="12" :lg="6">
			<memory-usage-last style="margin: .5rem 0"></memory-usage-last>
		</el-col>
	</el-row>

	<cpu-usage style="margin: 1.5rem 0"></cpu-usage>

	<memory-usage style="margin: 1.5rem 0"></memory-usage>
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
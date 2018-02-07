<template>
<div id="statistics">
	<div class="row">
		<div class="col-md-6 col-lg-3">
			<metric-card title="Session">
				<p class="card-text">1</p>
				
			</metric-card>
		</div>
		<div class="col-md-6 col-lg-3">
			<metric-card>
				<chart-gauge :min="0" :max="100"
					:unit="'%'"
					:value="10"></chart-gauge>
			</metric-card>

		</div>
		<div class="col-md-6 col-lg-3">
			<metric-card></metric-card>

		</div>
		<div class="col-md-6 col-lg-3">
			<metric-card></metric-card>
			
		</div>
	</div>

	<metric-card title="cpu usage" class="mt-3">
		<chart-linear :series="[{
			type: 'areaspline',
			name: 'Cpu Usage Per 1 Min',
			data: [23, 32, 54, 23]
		}]"
		:xAxis="{ type: 'datetime' }"
		:yAxis="[{
			labels: {
				format: '{value}%'
			}
		}]">

		</chart-linear>
	</metric-card>
</div>
</template>

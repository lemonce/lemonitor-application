<template>
<div>
	<div class="col-9">
		<div class="form-group">
			<label>{{$t('duration.time')}}</label>
			<b-form-slider class="mx-3 my-auto"
				v-model="options.time"
				:tooltip="'hide'"
				:ticks="[MIN, HOUR, DAY - MIN]"
				:ticks-positions="[0, 40, 100]"
				:ticks-labels="[$t('duration.min'), $t('duration.hour'), $t('duration.day')]"
				:step="step"></b-form-slider>
		</div>
	</div>

	<div class="col-3">
		<div class="form-group">
			<label for="time-duration-day">{{$t('duration.days')}}</label>
			<input type="text"
				v-model.number="options.days"
				class="form-control"
				id="time-duration-day">
		</div>
	</div>
	<div class="col-12">
		<label>{{$t('range.quick')}}</label>
		<ul class="list-group list-unstyled row">
			<li class="col-4 text-primary"
				v-for="(day, label) in preset.duration"
				:key="label"
				@click="sync(day)">{{$t(`preset.${label}`)}}</li>
		</ul>

	</div>

	<div class="col-12">
		<div class="alert alert-info mt-3 mb-0">
			<strong>{{$t('range.selected')}} :</strong> {{selectedDay}} {{$t('duration.day')}}
			{{selectedHour}} {{$t('duration.hour')}} {{selectedMin}} {{$t('duration.min')}}
		</div>

	</div>
</div>

</template>

<script>
import preset from './preset.json';
import {MIN, HOUR, DAY, mixin} from './time-control';

export default {
	name: 'range-from-duration',
	data() {
		return {
			options: this.getOptionsDuration()
		};
	},
	props: {
		value: {
			type: Number
		}
	},
	watch: {
		durationTimestamp: {
			handler(newValue) {
				this.$emit('input', newValue);
			},
			immediate: true
		}
	},
	methods: {
		getOptionsDuration() {
			const from = this.$store.getters['range/from'];
			const to = this.$store.getters['range/to'];

			const duration = to - from;

			return {
				days: Math.floor(duration / DAY),
				time: duration % DAY
			};
		},
		sync(value){
			this.options.days = value;

		},
	},
	computed: {
		preset() {
			return preset;
		},
		step() {
			const duration = this.options.time % DAY;

			if (duration < 15 * MIN) {
				return MIN;
			}

			if (duration < 30 * MIN) {
				return 5 * MIN;
			}

			if (duration < 60 * MIN) {
				return 10 * MIN;
			}

			return 30 * MIN;
		},
		durationTimestamp() {
			return this.options.days * DAY + this.options.time;
		},
		selectedMin() {
			const minLength = parseInt(this.options.time % HOUR);

			return parseInt(minLength / MIN);
		},
		selectedHour() {
			return parseInt(this.options.time / HOUR);
		},
		selectedDay() {
			return this.options.days;
		}
	},
	mixins:[mixin]
}
</script>

<style lang="less">
.d-inline-block {

	.slider-horizontal {
		width: 24rem;
	}
}
</style>

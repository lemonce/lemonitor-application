<template>
<div class="container-fluid">
	<div class="row">
		<div class="col-9">
			<div class="form-group">
				<label>{{$t('duration.time')}}</label>
				<b-form-slider style="margin: auto 12px;"
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
	</div>

	<h4>{{$t('range.quick')}}</h4>
	<ul class="list-group list-unstyled row">
		<li class="col-md-4"
			v-for="(day, label) in preset.duration"
			:key="label"
			@click="sync(day)"><a>{{$t(`preset.${label}`)}}</a></li>
	</ul>

	<div class="alert alert-info">
		<strong>{{$t('range.selected')}} :</strong> {{selectedDay}} {{$t('duration.day')}}
		{{selectedHour}} {{$t('duration.hour')}} {{selectedMin}} {{$t('duration.min')}}
	</div>

</div>
</template>

<script>
import preset from './preset.json';
import {MIN, HOUR, DAY, mixin} from './mixin';

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
			this.options.days=value;

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

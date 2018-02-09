<template>
<div>
	<div class="col-8">
		<div class="form-group">
			<label>{{$t('selectDate.date')}}</label>
			<datepicker
				v-model="options.date"
				:inline="true"
				:day-view-only="true"
				:disabled="disabled"
				:language="$i18n.locale"
			></datepicker>
		</div>
	</div>

	<div class="col-4">
		<div class="form-group">
			<label for="timepicker-from">{{$t('selectDate.time')}}</label>
			<timepicker v-model="options.time"
				hide-clear-button></timepicker>
		</div>

		<label>{{$t('range.quick')}}</label>
		<ul class="list-group list-unstyled">
			<li v-for="(presetFrom, index) in preset.time.from"
				:key="index"
				@click="setTime(presetFrom.offset)"
				class="text-primary">{{$t(`preset.${presetFrom.label}`)}}</li>
		</ul>
	</div>
	
	<div class="col-12">
		<div class="alert alert-info mt-3 mb-0">
			<strong>{{$t('range.selected')}} :</strong>&nbsp;{{selectedDate}}&nbsp;{{selectedTime}}
		</div>

	</div>
</div>

</template>

<script>
import dateFormat from 'dateformat';
import {
	MIN,
	HOUR,
	mixin,
	computeTimeModelFromTimestamp,
	computeDate
} from './time-control';

export default {
	name: 'range-from-from',
	props: {
		value: {
			type: Number
		}
	},
	mounted() {
		const timepickerFrom = document.querySelector('input.display-time');
		
		timepickerFrom.setAttribute('id', 'timepicker-from');
	},
	watch: {
		timestamp: {
			handler(newValue) {
				this.$emit('input', newValue);
			},
			immediate: true
		}
	},
	computed: {
		timestamp() {
			return this.options.date.getTime() +
				this.options.time.HH * HOUR +
				this.options.time.mm * MIN;
		},
		selectedDate() {
			return dateFormat(this.options.date, 'mm/dd/yyyy');
		},
		selectedTime() {
			return dateFormat(this.timestamp, 'HH:MM');
		}
	},
	data() {
		return {
			options: this.getOptions(),
			disabled: {
				from: new Date(),
				to: null
			}
		};
	},
	methods: {
		getOptions() {
			const date = new Date(this.$store.getters['range/from']);
			
			return {
				date: computeDate(date),
				time: computeTimeModelFromTimestamp(date)
			}
		}
	},
	mixins: [mixin]
}
</script>

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
				id="timepicker-from"
				hide-clear-button></timepicker>
		</div>

		<h4>{{$t('range.quick')}}</h4>
		<ul class="list-group list-unstyled">
			<li v-for="(presetFrom, index) in preset.time.from"
				:key="index"
				@click="setTime(presetFrom.offset)"
				class="text-primary">{{$t(`preset.${presetFrom.label}`)}}</li>
		</ul>
	</div>
	
	<div class="col-12">
		<div class="alert alert-info">
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
} from './mixin';

export default {
	name: 'range-from-from',
	props: {
		value: {
			type: Number
		}
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

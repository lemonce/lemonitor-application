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
			<label for="timepicker-to">{{$t('selectDate.time')}}</label>
			<timepicker v-model="options.time"
				id="timepicker-to"
				hide-clear-button></timepicker>
		</div>

		<h4>{{$t('range.quick')}}</h4>
		<ul class="list-group list-unstyled">
			<li v-for="(presetTo, index) in avalibleTo(preset.time.to)"
				:key="index"
				@click="setTime(presetTo.offset)"
				class="text-primary">{{$t(`preset.${presetTo.label}`)}}</li>
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
	name: 'range-to-to',
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
	computed:{
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
				to: computeDate(new Date(this.$store.getters['range/from']))
			},
		};
	},
	methods: {
		getOptions() {
			const date = new Date(this.$store.getters['range/to']);
			
			return {
				date: computeDate(date),
				time: computeTimeModelFromTimestamp(date)
			}
		},
		avalibleTo(presetList) {
			const from = this.$store.getters['range/from'];
			const to = this.$store.getters['range/to'];
			
			return presetList.filter(function (presetTo) {
				const offset = presetTo.offset * 1000;
				
				return to - offset > from;
			});
		}
	},
	mixins:[mixin]
}
</script>
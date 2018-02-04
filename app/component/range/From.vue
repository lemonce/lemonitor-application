<template>
<div id="range-from-picker">
	<ul class="nav nav-tabs datepicker-model">
		<li class="nav-item">
			<a @click.stop="options.type = 'moment'"
				:class="{'active': options.type === 'moment'}"
				class="nav-link"><i class="fa fa-chevron-left"></i>{{$t('range.date')}}</a>
		</li>
		<li class="nav-item">
			<a @click.stop="options.type = 'duration'"
				:class="{'active': options.type === 'duration'}"
				class="nav-link"><i class="fa fa-minus"></i>{{$t('range.duration')}}</a>
		</li>
	</ul>

	<component v-model="options.value"
		:is="model[this.options.type]"></component>

	<hr>
	<button class="btn btn-primary pull-right" @click="apply()">{{$t('range.apply')}}</button>
</div>
</template>

<script>
import Duration from './model/duration.vue';
import Moment from './model/from.vue';
import updateControl from './update-control';

export default {
	name: 'range-from',
	mixins: [ updateControl ],
	data() {
		return {
			options: {
				type: this.$store.state.range.from.type,
				value: 0
			}
		};
	},
	methods: {
		apply() {
			this.$store.dispatch('range/setFrom', this.options);

			this.$emit('apply');
		},
	},
	computed: {
		model() {
			return {
				duration: Duration,
				moment: Moment
			};
		}
	}
}
</script>

<style lang="less">
@import "~app/global.less";

#range-from-picker {
	&::before {
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: -5px;
		right: 68px;
		.timepicker();
	}

	.slider-horizontal {
		width: 348px;
	}
}
</style>
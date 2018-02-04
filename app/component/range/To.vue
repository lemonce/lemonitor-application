<template>
<div id="range-to-picker">
	<ul class="nav nav-tabs datepicker-model">
		<li class="nav-item">
			<a @click.stop="options.type = 'moment'"
				:class="{'active': options.type === 'moment'}"
				class="nav-link"><i class="fa fa-chevron-right"></i>{{$t('range.date')}}</a>
		</li>
		<li class="nav-item">
			<a @click.stop="options.type = 'now'"
				:class="{'active': options.type === 'now'}"
				class="nav-link"><i class="fa fa-step-forward"></i>{{$t('range.current')}}</a>
		</li>
	</ul>

	<component v-model="options.value"
		:is="model[this.options.type]"></component>

	<hr>
	<button @click="apply()" class="btn btn-primary pull-right">{{$t('range.apply')}}</button>
</div>
</template>

<script>
import Current from './model/current.vue';
import Moment from './model/to.vue';
import updateControl from './update-control';

export default {
	name: 'range-to',
	mixins: [ updateControl ],
	data() {
		return {
			options: {
				type: this.$store.state.range.to.type,
				value: 0
			}
		};
	},
	methods: {
		apply() {
			this.$store.dispatch('range/setTo', this.options);

			this.$emit('apply');
		}
	},
	computed: {
		model() {
			return {
				now: Current,
				moment: Moment
			};
		}
	}
}
</script>

<style lang="less">
@import "~app/global.less";

#range-to-picker {
	&::before {
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: -5px;
		right: 77px;
		.timepicker();
	}
}
</style>
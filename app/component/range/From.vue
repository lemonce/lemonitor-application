<template>
<div id="range-from-picker"
	class="dropdown-menu dropdown-picker card">
	<div class="card-header">
		<ul class="nav nav-tabs card-header-tabs">
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
	</div>
	<component class="card-body row"
		v-model="options.value"
		:is="model[this.options.type]"></component>

	<div class="card-footer">
		<button class="btn btn-primary pull-right" @click="apply()">{{$t('range.apply')}}</button>
	</div>

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
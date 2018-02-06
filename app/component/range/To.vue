<template>
<div id="range-to-picker"
	class="dropdown-menu dropdown-picker-card card p-0">
	<div class="dropdown-item card-header">
		<ul class="nav nav-tabs card-header-tabs">
			<li class="nav-item">
				<a @click.stop="options.type = 'moment'"
					:class="{'active': options.type === 'moment'}"
					class="nav-link"><i class="fa fa-chevron-right mr-2"
					></i>{{$t('range.date')}}</a>
			</li>
			<li class="nav-item">
				<a @click.stop="options.type = 'now'"
					:class="{'active': options.type === 'now'}"
					class="nav-link"><i class="fa fa-step-forward mr-2"
					></i>{{$t('range.current')}}</a>
			</li>
		</ul>

	</div>
	<component class="card-body row"
		v-model="options.value"
		:is="model[this.options.type]"></component>

	<div class="card-footer">
		<button @click="apply()" class="btn btn-primary pull-right">{{$t('range.apply')}}</button>
	</div>
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
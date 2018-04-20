<template>
<div>
	<el-tabs type="card">
		<el-tab-pane class="">
			<span slot="label"
				:class="{'is-active': options.type = 'moment'}"><i
					class="fa fa-chevron-left"></i>{{$t('range.date')}}</span>
			<moment></moment>
		</el-tab-pane>
		<el-tab-pane>
			<span slot="label"
				:class="{'is-active': options.type = 'duration'}"><i
					class="fa fa-minus"></i>{{$t('range.duration')}}
			<duration></duration>
			</span>
		</el-tab-pane>
	</el-tabs>
	<el-row>
		<el-button type="primary" class="pull-right" @click="apply()">{{$t('range.apply')}}</el-button>
	</el-row>

</div>
</template>

<script>
import Duration from './model/duration.vue';
import Moment from './model/from.vue';
import updateControl from './update-control';

export default {
	name: 'range-from',
	mixins: [ updateControl ],
	components: {
		Moment,
		Duration
	},
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
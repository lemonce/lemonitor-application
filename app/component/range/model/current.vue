<template>
<div class="text-center">
	<div class="col-12">
		<div class="card">
			<div class="card-body">
				<h5 class="card-title">{{$t('current.time')}}</h5>
				<h3 id="current-date"></h3>
				<p id="current-time" class="card-text"></p>
			</div>
		</div>
	</div>

	<div class="col-12">
		<div class="text-info mt-3">
			<p class="card-text">{{$t('current.tipOne')}} <strong>{{$t('range.selected')}}</strong>
				{{$t('current.tipTwo')}} <strong>{{$t('current.time')}}</strong> .</p>
		</div>

	</div>
</div>
</template>

// <script>
// import dateFormat from 'dateformat';

// export default {
// 	name: 'range-to-current',
// 	props: {
// 		value: {
// 			type: Number
// 		}
// 	},
// 	mounted() {
// 		const currentDateElement = this.$el.querySelector('#current-date');
// 		const currentTimeElement = this.$el.querySelector('#current-time');

// 		this.$emit('input', null);
// 		this.timer = setInterval(function clock() {
// 			currentDateElement.innerHTML = dateFormat(new Date(), 'mm/dd/yyyy');
// 			currentTimeElement.innerHTML = dateFormat(new Date(), 'HH:MM:ss');
		
// 			return clock;
// 		}(), 500);
// 	},
// 	destroyed() {
// 		clearInterval(this.timer);
// 	}
// }
// </script>
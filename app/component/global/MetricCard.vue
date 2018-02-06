<template>
<div class="card text-center bg-light metric w-100 rounded-0">
	<div class="card-header text-muted border-bottom-0 pb-0">{{title||'Untitled'}}</div>
	<div class="card-body">
		<slot></slot>
	</div>
</div>
</template>

<script>
export default {
	name: 'metric-card',
	props: [ 'title' ]
}
</script>

<style lang="less">
@import '~app/global.less';

.card.metric {
	height: 200px;

	> .card-header {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		background-color: transparent;
	}

	> .card-body {
		.card-text {
			font-size: 5rem;
			color: gray;
			text-align: center;
			padding: .25rem;
		}
	}
	//TODO chrome responsive
	> .card-body:empty::after {
		content: '';
		height: 100%;
		display: block;
		border: 2px dashed @gray-1;
		background-image: repeating-linear-gradient(45deg,
			transparent 15px, transparent 25px,
			@gray-2 25px, @gray-2 35px);
	}
}
</style>


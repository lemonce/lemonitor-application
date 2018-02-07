<template>
<div class="card text-center bg-light metric w-100 rounded-0">
	<div class="card-header text-muted border-bottom-0 w-100 pt-2">{{title||'Untitled'}}</div>
	<div class="card-body h-100">
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
		padding-bottom: 1.35rem;
	}

	> .card-body {
		padding-top: .5rem;
		.card-text {
			font-size: 5rem;
			color: gray;
			text-align: center;
			padding: .25rem;
		}
	}
	> .card-body:empty {
		padding: 0.5rem 1.25rem 3rem;
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


<template>
<el-card class="box-card">
	<div slot="header">
		<span>{{title}}</span>
	</div>
	<slot></slot>
</el-card>
</template>

<script>
export default {
	name: 'metric-card',
	props: ['title']
}
</script>

<style lang="less">
@import '~app/style/var.less';

.metric {
	> .metric-header {
		position: absolute;
		top: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		background-color: transparent;
	}

	> .metric-body {
		width: 100%;
		padding: 1rem;
		padding-top: 1.75rem;
		.metric-text {
			font-size: 5rem;
			color: gray;
			text-align: center;
			padding: .25rem;
			padding-top: 2rem;
		}
	}
	//[TODO] Incompatible with Chrome and Firefox or Edge
	> .metric-body:empty {
		padding: 1.25rem;
		padding-top: 3rem;
	}
	> .metric-body:empty::after {
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


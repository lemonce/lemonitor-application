<template>
<div>
	<div class="jumbotron">
		<h1 class="display-4">你好，{{username}}</h1>
		<p class="lead">......</p>
		<!-- <p class="lead">
			<a href="/">了解更多</a>
		</p> -->
	</div>
</div>

</template>

<script>
import axios from 'axios';

export default {
	name: 'welcome',
	computed: {
		username() {
			return this.$store.state.username;
		}
	}
}
</script>
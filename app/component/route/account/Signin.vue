<template>
<b-container style="margin-top: 7rem">
	<b-row>
		<b-col sm="8" offset-sm="2" md="6" offset-md="3" lg="4" offset-lg="4">
			<b-card>
				<b-card-header
					header-class="text-center"
					style="background-color: transparent;">
					<h4 slot="header">Sign in</h4>
				</b-card-header>
				<b-card-body>
					<b-form-group
						label="Username"
						label-for="username">
						<b-form-input
							id="username"
							v-model="options.name">
						</b-form-input>
					</b-form-group>
					<div class="form-group">
						<label for="password">Password</label>
						<div class="float-right">
							<a href="">Forgot password?</a>
						</div>
						<input type="password"
							v-model="options.password"
							class="form-control"
							id="password">
					</div>
					<b-button class="btn-block"
						variant="primary"
						@click="signIn()">Apply</b-button>
				</b-card-body>
			</b-card>

		</b-col>

	</b-row>
</b-container>

</template>

<script>
export default {
	name: 'login',
	data() {
		return {
			options: {
				name: '',
				password: ''
			}
		}
	},
	methods: {
		signIn() {
			this.$store.dispatch('account/signIn', this.options).then(() => {
				this.$router.push({ path: '/' });
			});
		}
	}
}
</script>

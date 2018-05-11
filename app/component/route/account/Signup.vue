<template>
<b-container style="margin-top: 7rem">
	<b-row>
		<b-col sm="8" offset-sm="2" md="6" offset-md="3" lg="4" offset-lg="4">
			<b-card>
				<b-card-header
					header-class="text-center"
					style="background-color: transparent;">
					<h4 slot="header">Sign up</h4>
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
					<b-form-group
						label="Password"
						label-for="password">
						<b-form-input
							id="password"
							v-model="options.password">
						</b-form-input>
					</b-form-group>
					<b-form-group
						label="Confirm"
						label-for="confirm">
						<b-form-input
							id="confirm"
							v-model="options.confirm">
						</b-form-input>
					</b-form-group>
					<b-button class="btn-block"
						variant="primary"
						@click="signIn()">Register</b-button>
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
				password: '',
				confirm: ''
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

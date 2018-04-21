<template>
<div class="container" style="margin-top: 7rem">
	<div class="row">
		<div class="col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
			<el-card class="box-card">
				<div slot="header">
					<span>Sign up</span>
				</div>
				<el-form ref="form"
					label-position="top"
					:model="options">
					<el-form-item label="Username">
						<el-input v-model="options.username"></el-input>
					</el-form-item>
					<el-form-item label="Password">
						<el-input v-model="options.password"
							type="password"></el-input>
					</el-form-item>
					<el-form-item label="Confirm">
						<el-input v-model="options.confirm"
							type="password"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary"
							@click="signUp()">Register</el-button>
					</el-form-item>
				</el-form>
			</el-card>
		</div>
	</div>
</div>

</template>

<script>
export default {
	name: 'login',
	data() {
		return {
			options: {
				username: '',
				password: '',
				confirm: ''
			}
		}
	},
	methods: {
		signUp() {
			this.$store.dispatch('account/signIn', this.options).then(() => {
				this.$router.push({ path: '/' });
			});
		}
	}
}
</script>

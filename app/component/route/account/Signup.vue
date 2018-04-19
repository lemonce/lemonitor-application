<template>
<div class="container" style="margin-top: 7rem">
	<div class="row">
		<div class="col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
			<!-- <div class="card">
				<div class="card-header text-center">
					<h4 class="card-title mb-0 py-2">Sign Up</h4>
				</div>
				<div class="card-body">
					<div class="form-group">
						<label for="username">Username</label>
						<input type="text"
							v-model="options.name"
							class="form-control"
							id="username">
					</div>
					<div class="form-group">
						<label for="password">Password</label>
						<input type="password"
							v-model="options.password"
							class="form-control"
							id="password">
					</div>
					<div class="form-group">
						<label for="confirm">Confirm</label>
						<input type="password"
							v-model="options.confirm"
							class="form-control"
							id="confirm">
					</div>
					<button class="btn btn-primary btn-block"
						@click="signIn()">Register</button>
				</div>
			</div> -->

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

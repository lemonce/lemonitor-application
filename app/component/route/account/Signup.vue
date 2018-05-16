<template>
<div class="container" style="margin-top: 7rem">
	<div class="row">
		<div class="col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4">

			<el-card class="box-card" shadow="never">
				<div slot="header">
					<span>用户注册</span>
				</div>

				<el-form ref="form"
					label-position="top"
					:model="options">
					<el-form-item label="用户名" required>
						<el-input v-model="options.username"></el-input>
					</el-form-item>

					<el-form-item label="密码" required>
						<el-input v-model="options.password"
							type="password"></el-input>
					</el-form-item>

					<el-form-item label="确认密码" required>
						<el-input v-model="options.confirm"
							type="password"></el-input>
					</el-form-item>

					<el-form-item>
						<el-button type="primary"
							@click="signUp()">注册</el-button>
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

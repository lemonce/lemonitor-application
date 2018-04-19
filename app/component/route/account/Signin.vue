<template>
<div class="container" style="margin-top: 7rem">
	<div class="row">
		<div class="col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
			<el-card class="box-card">
				<div slot="header">
					<span>Sign in</span>
				</div>
				<el-form ref="options"
					@validate="commitForm()"
					label-position="top"
					:model="options"
					:rules="optionsRule">
					<el-form-item label="Username"
						prop="name">
						<el-input v-model="options.name"></el-input>
					</el-form-item>
					<div class="clearfix">
						<el-button style="float: right;"
							type="text">Forgot password?</el-button>
						<el-form-item label="Password"
							prop="password">
							<el-input
								v-model="options.password"
								type="password"></el-input>
						</el-form-item>
					</div>
					<el-form-item>
						<el-button type="primary"
							:disabled="!passed"
							native-type="submit"
							@click="signIn()">Apply</el-button>
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
			passed: false,
			options: {
				name: '',
				password: ''
			},
			optionsRule: {
				name: [
					{
						required: true,
						message: 'Please input Activity name',
						trigger: 'blur'
					},
					{
						min: 3,
						max: 5,
						message: 'Length should be 3 to 5',
						trigger: 'blur'
					}
				],
				password: [
					{
						required: true,
						message: 'Please input'
					}
				]
			}
		}
	},
	methods: {
		signIn(formName) {
			this.$refs['options'].validate((valid) => {
				if (valid) {
					this.$store.dispatch('account/signIn', this.options).then(() => {
						this.$router.push({ path: '/' });
					});
				} else {
					return false;
				}
			});
		},
		commitForm() {
			return this.passed = true;
		}
	}
}
</script>

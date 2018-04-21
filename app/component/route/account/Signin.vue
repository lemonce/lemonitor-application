<template>
<div style="margin-top: 7rem">
	<el-row type="flex" justify="center">
		<el-col :xs="18" :sm="16" :md="12" :lg="8">
			<el-card class="box-card">
				<div slot="header">
					<span>Sign in</span>
				</div>
				<el-form ref="options"
					@submit.native.prevent="signIn()"
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
							native-type="submit">Apply</el-button>
					</el-form-item>
				</el-form>
			</el-card>
		</el-col>
	</el-row>
</div>

</template>

<script>
export default {
	name: 'login',
	data() {
		return {
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
						max: 16,
						message: 'Length should be 3 to 16',
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

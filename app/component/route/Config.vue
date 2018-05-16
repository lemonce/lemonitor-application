<template>
<div>
	<h3>{{$t('config.general')}}</h3>
	<hr>

	<div class="row">
		<div class="col-6">

			<el-form label-position="top">
				<el-form-item :label="$t('general.languages')">
					<el-select v-model="$store.state.lang">
						<el-option
							v-for="(lang, index) in langPool"
							:key="index"
							:value="lang.label"></el-option>
					</el-select>
				</el-form-item>
			</el-form>

		</div>
	</div>

	<h3>{{$t('config.flag')}}</h3>
	<hr>

	<div class="row">
		<div class="col-6">

			<h4>{{$t('flag.client')}}</h4>
			<el-form label-position="top">
				<el-form-item :label="$t('flagClient.expires')">
					<el-input v-model="flag.clientExpires"></el-input>
				</el-form-item>

				<el-form-item>
					<el-checkbox :label="$t('flagClient.httpOnly')"
						v-model="flag.clientSafety"></el-checkbox>
				</el-form-item>
			</el-form>

		</div>
	</div>

	<div class="row">
		<div class="col-6">

			<h4>{{$t('flag.user')}}</h4>
			<el-form label-position="top">
				<el-form-item :label="$t('flagUser.cookieKey')">
					<el-input v-model="flag.userKey"></el-input>
				</el-form-item>
			</el-form>

			<el-button
				type="primary"
				native-type="submit"
				@click="updateFlagConfig(flag.clientExpires, flag.clientSafety, flag.userKey)">{{$t('flag.update')}}
			</el-button>

		</div>
	</div>

</div>

</template>

<script>
export default {
	name: 'config',
	data() {
		return {
			locale: 'en',
			langPool: [
				{
					label: 'English',
					locale: 'en'
				},
				{
					label: '中文',
					locale: 'zh'
				}
			],
			flag: {
				clientExpires: null,
				clientSafety: '',
				userKey: null
			}
		}
	},
	methods: {
		chooseLang() {
			const index = document.querySelector('#lang-choice').selectedIndex;

			this.$store.state.lang = this.langPool[index].label;
			this.locale = this.langPool[index].locale;

			this.$i18n.locale = this.locale;
		}
	}
}
</script>
<template>
<div>
	<h3>{{$t('config.general')}}</h3>
	<hr>

	<b-row>
		<b-col cols="12" xl="6">
			<b-form-group
				:label="$t('general.languages')"
				label-for="lang-choice"
				:title="$t('general.languages')">
				<b-form-select
					id="lang-choice"
					v-model="locale"
					:options="langPool">
				</b-form-select>
			</b-form-group>
		</b-col>
	</b-row>

	<h3 class="mt-3">{{$t('config.flag')}}</h3>
	<hr>

	<b-row>
		<b-col cols="12" xl="6">
			<h4>{{$t('flag.client')}}</h4>

			<b-form-group
				:label="$t('flagClient.expires')"
				label-for="client-expires"
				:title="$t('flagClient.expires')">
				<b-form-input
					id="client-expires"
					v-model="flag.clientExpires">
				</b-form-input>
			</b-form-group>
			<b-form-group
				label-for="client-safety"
				:title="$t('flagClient.httpOnly')">
				<b-form-checkbox
					id="client-safety"
					v-model="flag.clientSafety">
					{{$t('flagClient.httpOnly')}}
				</b-form-checkbox>
			</b-form-group>
		</b-col>
	</b-row>

	<b-row class="mt-3">
		<b-col cols="12" xl="6">
			<h4>{{$t('flag.user')}}</h4>

			<b-form-group
				:label="$t('flagUser.cookieKey')"
				label-for="user-key"
				:title="$t('flagUser.cookieKey')">
				<b-form-input
					id="client-safety"
					v-model="flag.userKey">
				</b-form-input>
			</b-form-group>

			<b-button type="submit"
				class="float-right"
				variant="primary"
				@click="updateFlagConfig(flag.clientExpires, flag.clientSafety, flag.userKey)">
				{{$t('flag.update')}}
			</b-button>
		</b-col>
	</b-row>
</div>
</template>

<script>
export default {
	name: 'config',
	data() {
		return {
			locale: this.$store.state.lang,
			langPool: [
				{
					text: 'English',
					value: 'en'
				},
				{
					text: '中文',
					value: 'zh'
				}
			],
			flag: {
				clientExpires: null,
				clientSafety: '',
				userKey: null
			}
		}
	},
	watch: {
		locale() {
			this.$store.state.lang = this.locale;
			this.$i18n.locale = this.locale;
		}
	}
}
</script>
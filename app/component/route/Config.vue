<template>
<div>
	<h3>{{$t('config.general')}}</h3>
	<hr>
	<div class="row">
		<div class="col-6">
			<div class="form-group">
				<label for="lang-choice"
					:title="$t('general.languages')">{{$t('general.languages')}}</label>
				<select id="lang-choice"
					class="form-control"
					@change="chooseLang()"
					v-model="$store.state.lang">
					<option v-for="(lang, index) in langPool"
						:key="index">{{lang.label}}</option>
				</select>

			</div>
		</div>
	</div>

	<h3>{{$t('config.flag')}}</h3>
	<hr>
	<div class="row">
		<div class="col-6">
			<h4>{{$t('flag.client')}}</h4>
			<div class="form-group">
				<label for="client-expires"
					:title="$t('flagClient.expires')">{{$t('flagClient.expires')}}</label>
				<input id="client-expires"
					type="text"
					class="form-control"
					v-model="flag.clientExpires">
			</div>
			<div class="form-check">
				<input type="checkbox"
					class="form-check-input"
					id="client-safety"
					v-model="flag.clientSafety">
				<label for="client-safety"
					class="form-check-label">{{$t('flagClient.httpOnly')}}</label>
			</div>


		</div>
	</div>
	<div class="row mt-3">
		<div class="col-6">
			<h4>{{$t('flag.user')}}</h4>
			<div class="form-group">
				<label for="user-key"
					:title="$t('flagUser.cookieKey')">{{$t('flagUser.cookieKey')}}</label>
				<input id="user-key"
					type="text"
					class="form-control"
					v-model="flag.userKey">
			</div>

			<button type="submit"
				class="btn btn-primary float-right"
				@click="updateFlagConfig(flag.clientExpires, flag.clientSafety, flag.userKey)">
				{{$t('flag.update')}}
			</button>
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
		},
		
	},
	
}
</script>

<style lang="less">
.form-group.row label {
	padding-top: 7px;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
</style>

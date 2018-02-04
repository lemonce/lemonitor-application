<template>
<div>
	<h3>{{$t('config.general')}}</h3>
	<hr>
	<div class="row">
		<div class="col-6">
			<div>
				<div class="form-group row">
					<label
						for="lang-choice"
						class="col-sm-2 col-form-label"
						:title="$t('general.languages')">{{$t('general.languages')}}</label>
					<div class="col-sm-10">
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
		</div>
	</div>

	<h3>{{$t('config.flag')}}</h3>
	<hr>
	<div class="row">
		<div class="col-6">
			
			<form>
				<h4>{{$t('flag.client')}}</h4>
				<div class="form-group row">
					<label
						for="client-expires"
						class="col-sm-2 col-form-label"
						:title="$t('flagClient.expires')">{{$t('flagClient.expires')}}</label>
					<div class="col-sm-10">
						<input id="client-expires"
							type="text"
							class="form-control"
							v-model="flag.clientExpires">
					</div>
				</div>
				<div class="form-group row">
					<div class="col-sm-offset-2 col-sm-10">
						<div class="checkbox">
							<label for="client-safety">
								<input id="client-safety"
									type="checkbox"
									v-model="flag.clientSafety"> {{$t('flagClient.httpOnly')}}
							</label>
						</div>
					</div>
				</div>

				<h4>{{$t('flag.user')}}</h4>
				<div class="form-group row">
					<label
						for="user-key"
						class="col-sm-2 col-form-label"
						:title="$t('flagUser.cookieKey')">{{$t('flagUser.cookieKey')}}</label>
					<div class="col-sm-10">
						<input id="user-key"
							type="text"
							class="form-control"
							v-model="flag.userKey">
					</div>
				</div>

				<button type="submit"
					class="btn btn-primary pull-right"
					@click="updateFlagConfig(flag.clientExpires, flag.clientSafety, flag.userKey)">
					{{$t('flag.update')}}
				</button>
			</form>

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

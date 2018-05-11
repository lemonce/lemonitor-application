<template>
<div>
	<el-menu mode="horizontal"
		class="clearfix"
		style="user-select: none;">
		<logo class="el-menu-item"></logo>

		<el-submenu index="4"
			style="float: right;">
			<template slot="title"><i class="fa fa-user"></i></template>
			<el-menu-item index="4-1">Signed in as @{{username}}</el-menu-item>
			<el-menu-item index="4-2" @click="signout()">sign out</el-menu-item>
			<!-- <el-menu-item index="4-3" divided>Your profile</el-menu-item> -->
			<!-- <router-link
				tag="li"
				role="menuitem"
				class="el-menu-item"
				to="/config"
				:title="$t('nav.config')">Settings
			</router-link> -->
		</el-submenu>
		<!-- <router-link
			tag="li"
			role="menuitem"
			class="el-menu-item"
			style="float: right;"
			to="/notification"
			:title="$t('nav.notification')">
			<i class="fa fa-bell"></i>
		</router-link> -->

		<div class="el-menu-item"
			style="float: right;">
			<el-date-picker
				ref="picker"
				type="datetimerange"
				range-separator="-"
				start-placeholde="Start date"
				end-placeholde="End date"
				:clearable="false"
				:editable="false"
				:readonly="isToNow"
				:picker-options="{
					disabledDate
				}"
				@change="setDataUpdaterOptions()"
				v-model="datetimeRange"
				align="right">
			</el-date-picker>
			<el-checkbox border
				class="mb-0"
				:checked="!isToNow"
				@change="toggleToNow()">到现在</el-checkbox>
		</div>

	</el-menu>

	<div id="workbench">
		<app-menu id="menu" class="d-none d-md-block"></app-menu>
		<div id="view">
			<router-view class="container-fluid pt-3"></router-view>
		</div>
	</div>
</div>
</template>

<script>
import Logo from './Logo.vue';
import AppMenu from './Menu.vue';

import axios from 'axios';

const RANGE_ENSURE_INTERVAL = 2000;
const DAY = 24 * 3600 * 1000;

function getLastDay() {
	return new Date(Date.now() - DAY);
}

export default {
	name: 'app',
	components: { Logo, AppMenu },
	data() {
		return {
			username: null,
			rangeToUpdater: null,
			dataUpdaterTimer: null,
			datetimeRange: [getLastDay(), new Date()]
		};
	},
	computed: {
		isToNow() {
			return Boolean(this.rangeToUpdater);
		}
	},
	mounted() {
		this.setToNow();
		this.getUsername();
	},
	destroyed() {
		clearInterval(this.rangeToUpdater);
	},
	watch: {
		datetimeRange([from, to]) {
			if (this.isToNow) {
				return;
			}

			this.$store.dispatch('range/setFrom', {
				type: 'moment',
				value: from.getTime()
			});

			this.$store.dispatch('range/setTo', {
				type: 'moment',
				value: to.getTime()
			});
		}
	},
	methods: {
		disabledDate(date) {
			if (date > new Date) {
				return true;
			}
		},
		signout() {
			this.$store.dispatch('account/signOut').then(() => {
				this.$router.push({ path: '/account/signin' });
			});
		},
		setToNow() {
			this.rangeToUpdater = setInterval(() => {
				this.$refs.picker.$emit('input', [
					this.datetimeRange[0],
					new Date()
				]);
			}, 500);

			this.$store.dispatch('range/setTo', {
				type: 'now'
			});
		},
		setToDate() {
			clearInterval(this.rangeToUpdater);
			this.rangeToUpdater = null;
			
			this.$store.dispatch('range/setTo', {
				type: 'moment',
				value: this.datetimeRange[1].getTime()
			});
		},
		toggleToNow() {
			if (this.rangeToUpdater) {
				this.setToDate();
			} else {
				this.setToNow();
			}

			this.setDataUpdaterOptions();
		},
		setDataUpdaterOptions() {
			this.dataUpdaterTimer = setTimeout(() => {
				clearTimeout(this.dataUpdaterTimer);
				
				this.dataUpdaterTimer = null;

				const isDynamic = this.$store.getters['range/isDynamicDuration'];

				this.$Data.setAutoUpdate(isDynamic);
				this.$Data.forceUpdateAll();
			}, RANGE_ENSURE_INTERVAL);
		},
		getUsername() {
			const accountId = this.$store.state.account.id;

			return axios.get(`/api/account/${accountId}`)
				.then(res => {
					this.username = res.data.data.name;
				})
				.catch(err => {
					console.log(err);
				});
		}
	},
}
</script>

<style lang="less">
@import '~app/style/var.less';

#workbench {
	position: absolute;
	top: 61px;
	right: 0;
	bottom: 0;
	left: 0;
	overflow: hidden;
	width: 100%;

	#menu {
		border-right: 1px solid #e6e6e6;
		width: @menu;
		position: absolute;
		overflow-y: auto;
		height: 100%;
	}

	#view {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: @menu;
		overflow-y: auto;
		height: 100%;
	}
}

@media screen and (max-width: 768px) {
	#workbench #view {
		left: 0;
	}
}
</style>

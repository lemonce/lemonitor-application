<template>
<div>
	<el-container>
		<el-header>
			<el-menu mode="horizontal"
				class="clearfix">
				<logo class="el-menu-item"></logo>

				<el-submenu index="4" style="float: right;">
					<template slot="title"><i class="fa fa-user"></i></template>
					<el-menu-item index="4-1">Signed in as @User</el-menu-item>
					<el-menu-item index="4-2" @click="signout()">sign out</el-menu-item>
					<el-menu-item index="4-3" divided>Your profile</el-menu-item>
					<router-link
						tag="li"
						role="menuitem"
						class="el-menu-item"
						to="/config"
						:title="$t('nav.config')">Settings
					</router-link>
				</el-submenu>
				<router-link
					tag="li"
					role="menuitem"
					class="el-menu-item"
					style="float: right"
					to="/notification"
					:title="$t('nav.notification')">
					<i class="fa fa-bell"></i>
				</router-link>

				<div class="el-menu-item" style="float: right;">
					<el-date-picker
						ref="picker"
						type="datetimerange"
						range-separator="To"
						start-placeholde="Start date"
						end-placeholde="End date"
						:unlink-panels="true"
						:disabled="isTimeNowMode"
						v-model="timeRangeValue"
						align="right">
					</el-date-picker>
					<el-checkbox border v-model="isTimeNowMode"
						@change="toTimeRangeMode()">To now</el-checkbox>
				</div>
				
			</el-menu>
		</el-header>

		<el-container>
			<el-aside>
				<app-menu></app-menu>
			</el-aside>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
		
	</el-container>

</div>
</template>

<script>
import axios from 'axios';

import Logo from './Logo.vue';
import AppMenu from './Menu.vue';
// import { setInterval, clearInterval } from 'timers';

export default {
	name: 'app',
	components: { Logo, AppMenu },
	data() {
		return {
			isTimeFromShow: false,
			isTimeToShow: false,
			timeRangeValue: [new Date(), new Date()],
			isTimeNowMode: true
		};
	},
	mounted() {
		// this.toTimeNowMode();
	},
	methods: {
		toTimeNowMode() {
			const refreshTime = setInterval(() => {
				this.$refs.picker.$emit('input', [
					this.timeRangeValue[0], new Date()
				]);
			}, 500);

			return refreshTime;
		},
		openTimeTo() {
			this.isTimeToShow = !this.isTimeToShow;
			this.isTimeFromShow = false;
		},
		signout() {
			this.$store.dispatch('account/signOut').then(() => {
				this.$router.push({ path: '/account/signin' });
			});
		},
		toTimeRangeMode() {
			clearInterval(refreshTime)
		}
	},
}
</script>

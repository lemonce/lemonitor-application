<template>
<div>
	<el-menu mode="horizontal"
		class="clearfix">
		<el-menu-item index="1">
			<logo></logo>
		</el-menu-item>

		<el-submenu index="4" style="float: right;">
			<template slot="title"><i class="fa fa-user"></i></template>
			<el-menu-item index="4-1">Signed in as @User</el-menu-item>
			<el-menu-item index="4-2" divided>Your profile</el-menu-item>
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
		<router-link
			tag="li"
			role="menuitem"
			class="el-menu-item"
			style="float: right"
			to="/config"
			:title="$t('nav.config')">
			<i class="fa fa-cog"></i>
		</router-link>

		<el-menu-item style="float: right;" index="3">
			<el-dropdown trigger="click">
				<span class="el-dropdown-link"
					@click="openTimeTo()">{{formatedTo}}
					<i class="fa"
						:class="timeToModelIcon"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>
						<time-to v-if="isTimeToShow"
							></time-to>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</el-menu-item>
		<el-menu-item style="float: right;" index="2">
			<el-dropdown trigger="click">
				<span class="el-dropdown-link"
					@click="openTimeFrom()">
					<i class="fa"
						:class="timeFromModelIcon"></i>{{formatedFrom}}
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>
						<time-from v-if="isTimeFromShow"
							></time-from>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</el-menu-item>
		
	</el-menu>

	<div id="workbench">
		<app-menu class="d-none d-md-block"
			id="menu">
		</app-menu>
		<div id="view">
			<router-view class="container-fluid"></router-view>
		</div>
	</div>
	
</div>
</template>

<script>
import Logo from './Logo.vue';
import AppMenu from './Menu.vue';
import TimeFrom from './range/From.vue';
import TimeTo from './range/To.vue';

import dateFormat from 'dateformat';

export default {
	name: 'app',
	components: { Logo, AppMenu, TimeFrom, TimeTo },
	data() {
		return {
			isNavHide: true,
			isTimeFromShow: false,
			isTimeToShow: false
		};
	},
	methods: {
		toggleNavMenu() {
			this.isNavHide = !this.isNavHide;
		},
		openTimeFrom() {
			this.isTimeFromShow = !this.isTimeFromShow;
			this.isTimeToShow = false;
		},
		openTimeTo() {
			this.isTimeToShow = !this.isTimeToShow;
			this.isTimeFromShow = false;
		}
	},
	computed: {
		formatedFrom() {
			return dateFormat(this.$store.getters["range/from"], 'mm/dd/yyyy HH:MM');
		},
		formatedTo() {
			return dateFormat(this.$store.getters["range/to"], 'mm/dd/yyyy HH:MM');
		},
		isDuration() {
			if (this.$store.state["range"].from.type === "duration") {
				return true;
			}
		},
		isCurrent() {
			if (this.$store.state["range"].to.type === "now") {
				return true;
			}
		},
		isIllegal() {
			return this.$store.getters["range/isIllegal"];
		},
		timeFromModelIcon() {
			return {
				"fa-minus": this.isDuration,
				"fa-chevron-left": !this.isDuration
			};
		},
		timeToModelIcon() {
			return {
				"fa-step-forward": this.isCurrent,
				"fa-chevron-right": !this.isCurrent && !this.isIllegal,
				"fa-remove": !this.isCurrent && this.isIllegal
			};
		}
	},
}
</script>

<style lang="less">
@import '~app/style/var.less';

#global-nav {
	user-select: none;
}

#workbench {
	position: absolute;
	top: 4.3rem;
	right: 0;
	bottom: 0;
	left: 0;
	overflow: hidden;
	z-index: -1;
	width: 100%;

	#menu {
		background: #fff;
		border: 1px solid #e6e6e6;
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
		padding-top: 1.5rem;
	}
}

@media (max-width: 767px) {
	#workbench #view {
		left: 0;
	}
}

// #time-range-picker {
// 	a {
// 		cursor: pointer;
// 	}
// 	.illegal-to {
// 		animation: illegal 0.5s linear infinite;
// 	}

// 	.dropdown-picker-card {
// 		width: 38rem;
// 		top: 2.875rem;
// 		left: -28rem;

// 		&::before {
// 			content: '';
// 			width: 0;
// 			height: 0;
// 			position: absolute;
// 			top: -6px;
// 			right: 68px;
// 			.arrow-picker-dropdown();
// 		}

// 		.dropdown-item {
// 			&:active,
// 			&:focus {
// 				color: #212529;
// 				background-color: rgba(0, 0, 0, .03);
// 			}
// 			&:focus {
// 				outline: none;
// 			}
// 		}

// 		.card-body {
// 			li.text-primary {
// 				cursor: pointer;
// 			}
// 		}
// 		.nav-link {
// 			color: #007BFF;

// 			&.active {
// 				color: #495057;
// 			}
// 		}
// 	}
// }
</style>
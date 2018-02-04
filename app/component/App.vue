<template>
<div>
	<nav class="navbar navbar-dark bg-dark navbar-expand"
		id="global-nav">
		<a href="#" class="navbar-brand">
			<logo></logo>
		</a>
		<button class="navbar-toggler"
			@click="toggleNavMenu()"
			type="button">
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="navbar-collapse"
			:class="{'collapse': isNavHide}">
			<ul class="navbar-nav mr-auto" id="toolbar">
				<router-link
					tag="li"
					class="nav-item"
					to="/notification"
					:title="$t('nav.notification')">
					<a class="nav-link"><i class="fa fa-bell"></i></a>
				</router-link>
				<router-link
					tag="li"
					class="nav-item"
					to="/config"
					:title="$t('nav.config')">
					<a class="nav-link"><i class="fa fa-cog"></i></a>
				</router-link>
			</ul>

			<ul class="navbar-nav"
				id="time-range-picker">
				<li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle text-right"
						@click="openTimeFrom()"
					><i class="fa"
						:class="isDuration ? 'fa-minus' : 'fa-chevron-left'"
						style="margin-right: 0.5em"></i>{{formatedFrom}}</a>
					<time-from v-if="isTimeFromShow"
						@apply="isTimeFromShow = false"
						class="dropdown-menu dropdown-picker"></time-from>
				</li>
				<li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle"
						:class="{'illegal-to': isIllegal}"
						@click="openTimeTo()">{{formatedTo}}<i
							class="fa"
							:class="datepickerToSpanClass"
							style="margin-left: 0.5em"></i></a>
					<time-to v-if="isTimeToShow"
						@apply="isTimeToShow = false"
						class="dropdown-menu dropdown-picker"></time-to>
				</li>
				<li class="nav-item">
					<a class="nav-link"><i class="fa fa-refresh"
						:title="$t('nav.refresh')"></i></a>
				</li>
			</ul>
		</div>
	</nav>

	<div id="workbench">
		<app-menu class="d-none d-md-block"
			id="menu"></app-menu>
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
		datepickerToSpanClass() {
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
@import '~app/global.less';

#global-nav {
	user-select: none;

	// #toolbar li {
	// 	border-left: 1px solid @dark-5;
	// }
}

#workbench {
	position: absolute;
	width: 100%;
	top: 56px;
	right: 0;
	bottom: 0;
	left: 0;
	overflow: hidden;
	z-index: -1;

	#menu {
		background: @menu-bg;
		width: @menu-width;
		position: absolute;
		height: 100%;
		overflow-y: auto;
	}

	#view {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: @menu-width;
		height: 100%;
		overflow-y: auto;
		& > div.container-fluid {
			padding-top: 15px;
		}
	}
}

@media (max-width: 767px) {
	#workbench #view {
		left: 0;
	}
}

#time-range-picker {
	a {
		cursor: pointer;
	}
	.illegal-to {
		animation: illegal 0.5s linear infinite;
	}

	.dropdown-picker {
		display: block;
		box-shadow: none;
		padding: 5px 10px 15px;
		width: 540px;
		top: 45px;
		left: -335px;
		.nav-link {
			color: #212529;

			&.active,
			&:hover {
				color: #007BFF;
			}
		}
		i.fa {
			margin-right: 0.5em;
		}

		.alert {
			margin: 10px 0;
		}
	}
}
</style>

<template>
<div>
	<nav class="navbar navbar-dark bg-dark navbar-expand"
		id="global-nav">
		<a href="#" class="navbar-brand">
			<logo></logo>
		</a>
		<button class="navbar-toggler" type="button">
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse">
			<ul class="navbar-nav mr-auto">
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
					<a class="nav-link dropdown-toggle"
						@click=""
					><i class="fa fa-minus"></i></a>
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

export default {
	name: 'app',
	components: { Logo, AppMenu }
}
</script>

<style lang="less">
@import '~app/global.less';

#global-nav {
	user-select: none;
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
</style>

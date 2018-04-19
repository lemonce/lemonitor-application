<template>
<div>
	<!-- <div v-for="(group, index) in menu"
		:key="index"
		:class="{expanded: group.expanded}">
		<h6 @click="toggleGroup(group)"
			:title="$t(group.name)"
			class="menu-group m-0 border-left-0 border-right-0">
			{{$t(group.name)}}
		</h6>
		<ul v-for="(item, index) in group.itemList"
			:key="index"
			v-show="group.expanded"
			class="menu-group-item-list mb-0 pl-0">
			<router-link
				tag="li"
				:to="item.path"
				:title="$t(item.label)">
				<a class="menu-group-item">{{$t(item.label)}}</a>
			</router-link>
		</ul>
	</div> -->

	<el-row class="tac">
		<el-menu
			class="el-menu-vertical-demo"
			@click="toggleGroup(group)">
			<el-submenu v-for="(group, index) in menu"
				:key="index"
				:index="toString(index)">
				<template slot="title">
					<span>{{$t(group.name)}}</span>
				</template>
				<router-link
					v-for="(item, index) in  group.itemList"
					:key="index"
					:index="toString(index)"
					tag="li"
					role="menuitem"
					class="el-menu-item"
					:to="item.path"
					:title="$t(item.label)">
					{{$t(item.label)}}
				</router-link>
			</el-submenu>
		</el-menu>
	</el-row>
</div>
</template>

<script>
export default {
	name: 'app-menu',
	methods: {
		toggleGroup({expanded, name}) {
			if (expanded) {
				this.$store.dispatch('menu/collapseGroup', name);
			} else {
				this.$store.dispatch('menu/expandGroup', name);
			}
		}
	},
	computed: {
		menu() {
			return this.$store.state.menu.groupList;
		}
	}
}
</script>

<style lang="less">
@import '~app/style/var.less';

#menu {
	.menu-group {
		.group();
		background: @group-bg;
		padding: @base;
		color: @white;
		white-space: nowrap;
		text-indent: 1rem;
		line-height: 1rem;
		position: relative;
		margin: 0;
		border-width: 1px 0px;
		&:hover {
			background: @group-active;
		}
		&::before {
			content: "";
			width: 0;
			height: 0;
			position: absolute;
			top: 13px;
			left: 12px;
			.arrow-group-default();
		}
	}

	&.expanded .menu-group::before {
		top: 15px;
		left: 10px;
		.arrow-group-expand();
	}

	.menu-group-item-list {
		list-style: none;
		
		.menu-group-item {
			position: relative;
			padding: 10px 35px;
			font-size: 12px;
			white-space: nowrap;
			text-decoration: none;
			color: @white;
			display: block;

			&:hover {
				background: @dark-1;
			}
		}
		
		.router-link-exact-active {
			.menu-group-item {
				font-weight: bold;
				background: @dark-2;
				
				&::after {
					content: '';
					width: 0;
					height: 0;
					position: absolute;
					right: 0;
					top: 50%;
					margin-top: -6px;
					.arrow-group-item-select();
				}

			}
		}
	}

}
#menu {
	.el-menu {
		border: 0;
		// border-bottom: 1px solid #e6e6e6;
	}
}
</style>

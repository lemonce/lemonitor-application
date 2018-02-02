<template>
<div>
	<div v-for="(group, index) in menu"
		:key="index"
		:class="{expanded: group.expanded}"
		class="menu-group">
		<h5 @click="toggleGroup(group)"
			:title="$t(group.name)"
			class="menu-group-name">
			{{$t(group.name)}}
		</h5>
		<ul v-for="(item, index) in group.itemList"
			:key="index"
			v-show="group.expanded"
			class="menu-item">
			<router-link
				tag="li"
				:to="item.path"
				:title="$t(item.label)">
				<a class="menu-item-name">{{$t(item.label)}}</a>
			</router-link>
		</ul>
	</div>
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
@import '~app/global.less';

#menu {
	.menu-group {
		.menu-group-name {
			.border(1px, solid, @group-border);
			background: @group-bg;
			border-left: 0;
			border-right: 0;
			padding: @base;
			margin: 0;
			color: @white;
			white-space: nowrap;
			text-indent: 1em;
			line-height: 14px;
			position: relative;
			&:hover {
				background: @blue;
			}
			&::before {
				content: "";
				width: 0;
				height: 0;
				position: absolute;
				top: 13px;
				left: 12px;
				.default-group-arrow();
			}
		}

		&.expanded .menu-group-name::before {
			top: 15px;
			left: 10px;
			.expanded-group-arrow();
		}

		.menu-item {
			list-style: none;
			padding-left: 0;
			margin-bottom: 0;
			.menu-item-name {
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
				.menu-item-name {
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
						.select-item-arrow();
					}
				}
			}
		}

	}
}
</style>

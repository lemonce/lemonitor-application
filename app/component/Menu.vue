<template>
	<el-menu>
		<el-submenu v-for="(group, index) in menu"
			:key="index"
			:index="index+''">
			<template slot="title">
				<span>{{$t(group.name)}}</span>
			</template>
			<router-link
				v-for="(item, itemIndex) in  group.itemList"
				:key="itemIndex"
				:index="index+'-'+itemIndex"
				tag="li"
				role="menuitem"
				class="el-menu-item"
				:to="item.path"
				:title="$t(item.label)">
				{{$t(item.label)}}
			</router-link>
		</el-submenu>
	</el-menu>
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
		},
	},
	computed: {
		menu() {
			return this.$store.state.menu.groupList;
		}
	}
}
</script>

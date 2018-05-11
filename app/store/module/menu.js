'use strict';

const MAX_PRIORITY = 0xF000;

function GroupFactory(name = 'untitled', itemList = [], priority = 0x3000) {
	return {
		priority,
		name,
		itemList,
		expanded: false,
	};
}

function ItemFactory(label, path, code) {
	return { label, path, code };
}

function findGroupByName(list, name) {
	return list.find(group => group.name === name);
}

export default {
	namespaced: true,
	state: {
		groupList: [
			GroupFactory('group.overview', [
				ItemFactory('overview.statistics', '/statistics'),
				// ItemFactory('overview.about', '/about')
			])
		]
	},
	getters: {
		groupByName(state) {
			return name => findGroupByName(state.groupList, name);
		}
	},
	actions: {
		addGroup({commit}, options) {
			commit('appendGroup', options);
		},
		addItem({commit}, options) {
			commit('appendGroup', options);
		},
		expandGroup({commit}, name) {
			commit('setGroupExpanded', { name, expanded: true });
		},
		collapseGroup({commit}, name) {
			commit('setGroupExpanded', { name, expanded: false });
		}
	},
	mutations: {
		appendGroup(state, {name, itemList, priority}) {
			const newGroup = GroupFactory(name, itemList, priority);
			const groupList = state.groupList;
		
			let index = groupList.findIndex(group => {
				return group.priority > newGroup.priority;
			});
		
			if (index === -1) {
				index = groupList.length;
			}
		
			groupList.splice(index, 0, newGroup);
		},
		appendItem(state, {groupName, label, path, code}) {
			const group = findGroupByName(state.groupList, groupName);

			group.itemList.push(ItemFactory(label, path, code));
		},
		setGroupExpanded(state, {name, expanded = true}) {
			const group = findGroupByName(state.groupList, name);

			group.expanded = Boolean(expanded);
		}
	}
};
'use strict';

import store from './store/index.js';

export default {
	addGroup(name, itemList, priority) {
		store.dispatch('menu/addGroup', { name, itemList, priority });
	},
	addItem(groupName, label, path) {
		store.dispatch('menu/addItem', { groupName, label, path });
	}
}
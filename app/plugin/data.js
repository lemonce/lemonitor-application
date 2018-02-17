'use strict';
import axios from 'axios';

const http = axios.create();
const MIN_UPDATE_INTERVAL = 30 * 1000;

const DEFAULT_AFTER_UPDATE = v => v;
let $afterUpdate = DEFAULT_AFTER_UPDATE;

class DataSource {
	constructor(update, cycle, keepUpdating = false) {
		if (typeof update !== 'function') {
			throw new Error('A function as updater excepted.');
		}

		if (Number.isInteger(cycle) && cycle < MIN_UPDATE_INTERVAL) {
			throw new Error('An unsigned integer number as cycle excepted.');
		}

		this.$update = update;
		this.$lastRequestTime = 0;
		this.cycle = cycle;
		this.keepUpdating = keepUpdating;

		this.$updatePromise();
	}

	get updated() {
		return Date.now() - this.$lastRequestTime < this.cycle;
	}

	get needUpdate() {
		return this.cycle && !this.updated;
	}

	$updatePromise() {
		return $afterUpdate(Promise.resolve()
			.then(() => this.$update(http))
			.then(() => this.$lastRequestTime = Date.now()));
	}

	update() {
		if (this.needUpdate) {
			this.$updatePromise();
		}

		return this;
	}

	forceUpdate() {
		this.$updatePromise();

		return this;
	}
}

export default {
	install(Vue, {
		afterUpdate = DEFAULT_AFTER_UPDATE
	} = {}) {
		let isAutoUpdate = false;
		let componentList = [];

		$afterUpdate = afterUpdate;

		const Data = Vue.prototype.$Data = function (init, updater, cycle, keep) {
			const dataSource = new DataSource(updater, cycle, keep);

			this.$dataGroup.list.push(dataSource);

			return init;
		};

		Data.forceUpdateAll = function () {
			componentList.forEach(group => group.forceUpdateAll());
		};

		Data.setAutoUpdate = function (value = false) {
			isAutoUpdate = Boolean(value);
		};

		Vue.mixin({
			beforeCreate() {
				const group = this.$dataGroup = {
					list: [],
					forceUpdateAll() {
						this.list.forEach(dataSource => dataSource.forceUpdate());
					},
					rootListener() {
						group.forceUpdateAll();
					},
					watcher: setInterval(() => {
						if (isAutoUpdate) {
							group.list.forEach(dataSource => dataSource.update());
						} else {
							group.list.forEach(dataSource => {
								if (dataSource.keepUpdating) {
									dataSource.update();
								}
							});
						}
					}, 15000)
				};

				componentList.push(group);
			},
			destroyed() {
				clearInterval(this.$dataGroup.watcher);
				
				componentList = componentList.filter(group => group !== this.$dataGroup);
			}
		});
		
		
	}
};
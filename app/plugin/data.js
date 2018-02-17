'use strict';
let groupStorage = [];
const helper = {};

const MIN_UPDATE_INTERVAL = 30 * 1000;
const DIVISION_FACTOR = 4;

class DataSource {
	constructor(update, cycle) {
		if (typeof update !== 'function') {
			throw new Error('A function as updater excepted.');
		}

		if (!Number.isInteger(cycle) || cycle < 0) {
			throw new Error('An unsigned integer number as cycle excepted.');
		}

		this.$update = update;
		this.$lastRequestTime = 0;

		this.cycle = Math.max(MIN_UPDATE_INTERVAL, cycle);

		this.$updatePromise();
	}

	get updated() {
		return Date.now() - this.$lastRequestTime < this.cycle;
	}

	$updatePromise() {
		return Promise.resolve()
			.then(() => this.$update(helper))
			.then(() => this.$lastRequestTime = Date.now());
	}

	update() {
		this.$updatePromise();

		return this;
	}
}

class DataSourceGroup {
	constructor() {
		this.group = [];

		this.$watcher = null;

		groupStorage.push(this);
	}

	createDataSource(updater, options) {
		const dataSource = new DataSource(updater, options);

		this.group.push(dataSource);
		this.$restart();

		return dataSource;
	}

	updateAll() {
		this.group.forEach(dataSource => {
			dataSource.update();
		});

		return this;
	}

	get watching() {
		return this.$watcher !== null;
	}

	get interval() {
		let minCycle = Number.MAX_SAFE_INTEGER;

		this.group.forEach(dataSource => {
			minCycle = Math.min(dataSource.cycle, minCycle);
		});
		
		return minCycle / DIVISION_FACTOR;
	}

	$updateWatched() {
		this.group.forEach(dataSource => {
			if (dataSource.updated) {
				return;
			}

			dataSource.update();
		});
	}
	
	$restart() {
		return this.stop().start();
	}

	stop() {
		clearInterval(this.$watcher);
		this.$watcher = null;

		return this;
	}

	start() {
		if (this.watching) {
			throw new Error(`This dataSourceGroup(id:${this.id}) is watching.`);
		}
		
		this.$watcher = setInterval(() => this.$updateWatched(), this.interval);

		return this;
	}

	destroy() {
		this.stop();
		
		groupStorage = groupStorage.filter(dataSourceGroup => {
			return dataSourceGroup !== this;
		});
	}
}

export default {
	install(Vue) {
		const Data = Vue.prototype.$Data = function (define, updater, cycle) {
			if (!cycle) {
				Promise.resolve().then(updater(helper));
			} else {
				this.$dataGroup.createDataSource(updater, cycle);
			}

			this.$on('data-update-check');
			this.$on('data-force-update');

			return define;
		};

		Data.updateAll = function () {
			groupStorage.forEach(dataSourceGroup => {
				dataSourceGroup.updateAll();
			});
		};

		Data.stopAll = function () {
			groupStorage.forEach(dataSourceGroup => {
				dataSourceGroup.stop();
			});
		};

		Data.startAll = function () {
			groupStorage.forEach(dataSourceGroup => {
				dataSourceGroup.start();
			});
		};

		Data.registerHelper = function (name, fn) {
			helper[name] = fn;
		};

		Vue.mixin({
			beforeCreate() {
				this.$dataGroup = new DataSourceGroup();
			},
			destroyed() {
				this.$off();
			}
		});
	}
};
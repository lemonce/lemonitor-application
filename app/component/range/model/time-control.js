'use strict';

import preset from './preset.json';

export const MIN = 60 * 1000;
export const HOUR = 60 * MIN;
export const DAY = 24 * HOUR;

export function computeDate(date) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export function computeTimeModelFromTimestamp(date) {
	const hour = date.getHours();
	const min = date.getMinutes();

	return {
		HH: hour,
		mm: min
	};
};

export const mixin = {
	computed: {
		preset() {
			return preset;
		},
		MIN() {
			return MIN;
		},
		DAY() {
			return DAY;
		},
		HOUR() {
			return HOUR;
		}
	},
	methods: {
		setTime(offsetSecond) {
			const from = Date.now();
			const offset = offsetSecond * 1000;
			const date = new Date(from - offset);

			this.options.date = computeDate(date);
			this.options.time = computeTimeModelFromTimestamp(date);
		}
	}
};
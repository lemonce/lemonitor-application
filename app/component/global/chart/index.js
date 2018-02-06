'use strict';

import Vue from 'vue';

import Highcharts from 'highcharts';
import './theme.js';

Vue.component('highcharts', Highcharts);

import Heatmap from './type/heatmap.vue';
import Linear from './type/linear.vue';
import Pie from './type/pie.vue';
import Gauge from './type/gauge.vue';
import Column from './type/column.vue';

Vue.component('chart-heatmap', Heatmap);
Vue.component('chart-linear', Linear);
Vue.component('chart-pie', Pie);
Vue.component('chart-gauge', Gauge);
Vue.component('chart-column', Column);
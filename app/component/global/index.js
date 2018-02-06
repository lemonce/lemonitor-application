'use strict';

import Vue from 'vue';
import Datepicker from 'vuejs-datepicker';

import MetricCard from './MetricCard.vue';
import './chart';

Vue.component('datepicker', Datepicker);
Vue.component('metric-card', MetricCard);
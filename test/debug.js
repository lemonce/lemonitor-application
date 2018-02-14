'use strict';
const { bootstrap, launch } = require('lemonitor-service');

require('../')

bootstrap().then(() => {
    launch();
});
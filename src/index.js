'use strict';

const express = require('express');
const path = require('path');
const http = require('http');

//express middleware

const app = module.exports = express();

const server = http.createServer(app);

server.listen(8800, () => {
	console.log('hha')
});


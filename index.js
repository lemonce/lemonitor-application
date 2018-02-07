'use strict';
const { application, config } = require('lemonitor-service');
const path = require('path');
const express = require('express');

const htdocPath = config.getPath('htdocs');
const publicPath = path.resolve(htdocPath, './public');

application.use('/', express.static(publicPath));
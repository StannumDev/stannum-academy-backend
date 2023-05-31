const express = require('express');
const route = express.Router();
const { getLogs } = require('../controllers/log');

route.get('/get-logs', getLogs)

module.exports = route;
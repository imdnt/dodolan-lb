'use strict';

const p = require('../package.json');
const version = p.version.split('.').shift();

module.exports = {
  restApiRoot: '/api' + (version > 0 ? '/v' + version : ''),
  host: '0.0.0.0',
  port: process.env.KOOL_PORT || 3000,
};

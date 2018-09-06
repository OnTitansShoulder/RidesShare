var _ = require('lodash'),
  path = require('path');

var initGlobalConfig = function () {
  if (!process.env.NODE_ENV) {
    console.error('+ Error: NODE_ENV is not defined! Using default development environment');
    process.env.NODE_ENV = 'development';
  }

  // Get the default config
  var defaultConfig = require(path.join(process.cwd(), 'config/env/default'));

  // Get the current config
  var environmentConfig = require(path.join(process.cwd(), 'config/env/', process.env.NODE_ENV)) || {};

  // Get the hidden local config
  var localConfig = require(path.join(process.cwd(), 'config/env/local-dev')) || {};

  // Merge config files
  var config = _.merge(defaultConfig, environmentConfig, localConfig);

  return config;
};

module.exports = initGlobalConfig();

const path = require('path');

module.exports = {
  webpack: (config) => {
    // Adding polyfill for 'process'
    config.resolve.fallback = {
      process: require.resolve('process/browser'),
    };
    return config;
  },
};

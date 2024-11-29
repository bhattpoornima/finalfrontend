module.exports = function override(config) {
  config.resolve.fallback = {
    crypto: require.resolve('crypto-browserify'),
    util: require.resolve('util/'),
    stream: require.resolve('stream-browserify'),
    buffer: require.resolve('buffer/')  // Add this line for 'buffer' polyfill
  };
  return config;
};

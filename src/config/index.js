const env = process.env.NODE_ENV;

if (!env || env === 'dev') {
  module.exports = require('./development');
} else if (env === 'production') {
  module.exports = require('./production');
}

const config = require('./config');
const massive = require('massive');

const {username, password, host, port, database} = config.postgres;

module.exports = massive.connectSync({
  connectionString: `postgres://${username}:${password}@${host}:${port}/${database}`
});

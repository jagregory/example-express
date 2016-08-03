const postgrator = require('postgrator');
const config = require('./config');

postgrator.setConfig(Object.assign({
  migrationDirectory: __dirname + '/../migrations',
  driver: 'pg',
}, config.postgres));

function Migrate(cb) {
  postgrator.migrate('002', function (err, migrations) {
    postgrator.endConnection(function () {
      cb(err, migrations);
    });
  });
}

module.exports = Migrate;

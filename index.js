const app = require('./src');
const Migrate = require('./src/migrate');

const port = process.env.PORT || 8000;

const exit = (message, err) => {
  console.error(message, err);
  return process.exit(1);
}

Migrate(err => {
  if (err) {
    return exit('Failed to run migrations', err);
  }

  app.listen(port, err => {
    if (err) {
      return exit('Failed to start server', err);
    }
    
    console.log('Listening on http://localhost:%d', port);
  });
});

const {NotFoundError} = require('../errors');

function SchemaErrorHandler(err, req, res, next) {
  if (err.name !== 'JsonSchemaValidation') {
    return next(err);
  }

  return res.status(400).json({
    error: 'Schema validation failed',
    validations: err.validations
  });
}

function NotFoundErrorHandler(err, req, res, next) {
  if (!(err instanceof NotFoundError)) {
    return next(err);
  }

  return res.status(404).send('Not Found');
}

function VagueErrorHandler(err, req, res, next) {
  if (!err) {
    return next();
  }

  if (process.env.NODE_ENV === 'production') {
    return res.status(500).send('Internal Server Error');
  }

  return res.status(500).send(err.stack);
}

module.exports = [
  SchemaErrorHandler,
  NotFoundErrorHandler,
  VagueErrorHandler,
];

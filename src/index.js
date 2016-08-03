const bodyParser = require('body-parser');
const errors = require('./middleware/errors');
const express = require('express');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(routes);
app.use(errors);

module.exports = app;

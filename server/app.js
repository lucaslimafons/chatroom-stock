const express = require('express');
const routes = require('../routes/index')
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const moverride = require('method-override');
const cors = require('./cors');
require('dotenv').config();

let app = express();

app.use(compression())
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }))
app.use(cookieParser());
app.use(moverride('X-HTTP-Method-Override'));
app.use(cors());

app.use('/', routes);

require('./kafka');
require('./kafka-producer');
require('./kafka-consumer');

// Production error handler
if (app.get('env') === 'production') {
  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.sendStatus(err.status || 500)
  })
}

module.exports = app;

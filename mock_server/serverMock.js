import express from 'express';
import bodyParser from 'body-parser';
import chalk from 'chalk';

import auth from './controllers/auth';
import messageResource from './controllers/messageResource';
import customer from './controllers/customer';
import workflow from './controllers/workflow';

const app = express();

const allowedOrigins = ['http://localhost:3000', 'http://as-ess.surge.sh'];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* eslint-disable no-console */
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'OPTIONS,DELETE,PUT');
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-jwt-token');
  res.header('Access-Control-Expose-Headers', 'x-jwt-token');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.all('*', function(req, resp, next) {
  console.log(chalk.blue(JSON.stringify(req.body)));
  next();
});

app.use('/auth', auth);
app.use('/messageResource', messageResource);
app.use('/customers', customer);
app.use('/workflows', workflow);

module.exports = app;

///////////////////////////////////////////////////////

import express from 'express';

import { conf } from '../config/config';
import { getJsonFromFile } from '../utils';

const router = express.Router();

//routes
router.post('/authenticate', authenticate);
router.get('/extend-session', extendSession);

function authenticate(req, res) {
  res.setHeader('x-jwt-token', conf.auth.xJwtToken);
  setTimeout(() => {
    if (req.body && req.body.username === 'admin' && req.body.password === 'admin') {
      res.json({
        status: 'success',
        message: '',
        data: getJsonFromFile('./data/authenticate.json'),
      });
    } else {
      res.json({
        status: 'error',
        message: 'Oops! Your username or password is invalid.',
        data: getJsonFromFile('./data/authenticate.json'),
      });
    }
  }, 2000);
}

function extendSession(req, res) {
  res.setHeader('x-jwt-token', conf.auth.xJwtToken);
  setTimeout(() => {
    res.json({
      status: 'success',
      message: '',
    });
  }, 2000);
}

export default router;

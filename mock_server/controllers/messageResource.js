import express from 'express';
import chalk from 'chalk';

import { conf } from '../config/config';
import { getJsonFromFile } from '../utils';

const router = express.Router();

//routes
router.get('/', getMessageResource);

function getMessageResource(req, res) {
  if (req.query && req.query.namespaces) {
    console.log(chalk.blue('URL: "/messageResource"\n Query Params: ' + JSON.stringify(req.query)));
  }

  res.setHeader('x-jwt-token', conf.auth.xJwtToken);
  setTimeout(() => {
    res.json({
      status: 'success',
      message: '',
      data: {
        messageResources: getJsonFromFile('./data/messageResource.json'),
      },
    });
  }, 2000);
}

export default router;

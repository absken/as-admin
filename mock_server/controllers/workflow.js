import express from 'express';
import mongoose from 'mongoose';
import chalk from 'chalk';

import { conf } from '../config/config';
import { getJsonFromFile } from '../utils';

const Workflow = mongoose.model('Workflow');
const router = express.Router();

//routes
router.get('/', getWorkflows);

async function getWorkflows(req, res) {
  res.setHeader('x-jwt-token', conf.auth.xJwtToken);

  const page = req.query.page || 1;
  const sort = req.query.sort && JSON.parse(req.query.sort);
  const limit = req.query.limit || 10000;
  const skip = page * limit - limit;

  const newSort =
    Array.isArray(sort) && sort.length > 0 ? { [sort[0].field]: sort[0].sort } : { id: 'asc' };

  console.log(newSort);

  // 1. Query the database for a list of all stores
  const workflowsPromise = Workflow.find().skip(skip).limit(limit).sort(newSort);

  const countPromise = Workflow.count();

  const [workflows, count] = await Promise.all([workflowsPromise, countPromise]);
  const pages = Math.ceil(count / limit);

  if (!workflows.length && skip) {
    req.text(
      'info',
      `Hey! You asked for page ${page}. But that doesn't exist. So I put you on page ${pages}`
    );
    return;
  }

  setTimeout(() => {
    res.json({
      status: 'success',
      message: '',
      data: {
        workflows: workflows,
        zPages: pages,
        zPage: parseInt(page),
        zCount: count,
      },
    });
  }, 3000);
}

export default router;

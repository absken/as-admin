import express from 'express';
import mongoose from 'mongoose';
import chalk from 'chalk';

import { conf } from '../config/config';
import { getJsonFromFile } from '../utils';

const Workflow = mongoose.model('Workflow');
const router = express.Router();

//routes
router.get('/', getWorkflows);
router.get('/csv', getWorkflowsCsv);

async function getWorkflows(req, res) {
  res.setHeader('x-jwt-token', conf.auth.xJwtToken);

  const page = req.query.page || 1;
  const limit = req.query.limit || 10000;
  const skip = page * limit - limit;
  const sort = req.query.sort && JSON.parse(req.query.sort);
  const search = req.query.search && JSON.parse(req.query.search);

  const newSort =
    Array.isArray(sort) && sort.length > 0 ? { [sort[0].field]: sort[0].sort } : { id: 'asc' };

  let re = null;
  let mongoQuery = null;
  if (Array.isArray(search)) {
    mongoQuery = { $and: [] };
    search.forEach((searchItem) => {
      re = new RegExp(searchItem, 'i');
      mongoQuery['$and'].push({
        $or: [{ firstName: { $regex: re } }, { lastName: { $regex: re } }],
      });
    });
  }
  const workflowsPromise = Workflow.find(mongoQuery).skip(skip).limit(limit).sort(newSort);

  const countPromise = Workflow.find(mongoQuery).count();

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

async function getWorkflowsCsv(req, res) {
  res.setHeader('x-jwt-token', conf.auth.xJwtToken);

  const sort = req.query.sort && JSON.parse(req.query.sort);
  const search = req.query.search && JSON.parse(req.query.search);

  const newSort =
    Array.isArray(sort) && sort.length > 0 ? { [sort[0].field]: sort[0].sort } : { id: 'asc' };

  let re = null;
  let mongoQuery = null;
  if (Array.isArray(search)) {
    mongoQuery = { $and: [] };
    search.forEach((searchItem) => {
      re = new RegExp(searchItem, 'i');
      mongoQuery['$and'].push({
        $or: [{ firstName: { $regex: re } }, { lastName: { $regex: re } }],
      });
    });
  }

  const workflows = await Workflow.find(mongoQuery).sort(newSort);

  setTimeout(() => {
    res.json({
      status: 'success',
      message: '',
      data: {
        workflows: workflows,
      },
    });
  }, 3000);
}

export default router;

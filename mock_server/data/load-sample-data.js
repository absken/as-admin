require('dotenv').config({ path: __dirname + '/../.env' });
const databaseUrls = require('../config/db.config');

const fs = require('fs');

const mongoose = require('mongoose');
mongoose.connect(databaseUrls.urlLocal);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

// import all of our models - they need to be imported only once
const Workflow = require('../models/Workflow');

const workflows = JSON.parse(fs.readFileSync(__dirname + '/workflows.json', 'utf-8'));

async function deleteData() {
  console.log('😢😢 Goodbye Data...');
  await Workflow.deleteMany();
  console.log('Data Deleted. To load sample data, run\n\n\t npm run sample-data\n\n');
  process.exit();
}

async function loadData() {
  try {
    await Workflow.insertMany(workflows);
    console.log('👍👍👍👍👍👍👍👍 Done!');
    process.exit();
  } catch (e) {
    console.log(
      '\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blow-sample-data\n\n\n'
    );
    console.log(e);
    process.exit();
  }
}
if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}

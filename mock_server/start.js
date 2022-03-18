const mongoose = require('mongoose');
const chalk = require('chalk');

// import environmental variables from our variables.env file
require('dotenv').config();

const databaseUrls = require('./config/db.config');

// Connect to our Database and handle any bad connections
mongoose.connect(databaseUrls.url);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// READY?! Let's go!

// import all of our models
require('./models/Workflow');

// Start our app!
const app = require('./serverMock');
const port = process.env.NODE_DOCKER_PORT || 3005;

// if port is in  use, sudo kill -9 `sudo lsof -t -i:3005`
app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(chalk.bgBlack(`Mock server is listening a on port ${port}!`));
  }
});

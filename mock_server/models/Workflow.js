const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const workflowSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  fullName: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
  },
});

module.exports = mongoose.model('Workflow', workflowSchema);

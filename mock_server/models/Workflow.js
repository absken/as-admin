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

workflowSchema.index({
  id: 'text',
  firstName: 'text',
  lastName: 'text',
  age: 'text',
});

module.exports = mongoose.model('Workflow', workflowSchema);

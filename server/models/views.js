const mongoose = require('mongoose');

const ViewSchema = new mongoose.Schema({
  view: {
    type: String,
    enum: ['private', 'public'],
    default: 'private'
  }
});

module.exports = mongoose.model('View', ViewSchema);

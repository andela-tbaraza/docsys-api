const mongoose = require('mongoose');

const ViewSchema = new mongoose.Schema({
  view: {
    type: String,
    unique: true,
    enum: ['private', 'public']
  }
});

module.exports = mongoose.model('View', ViewSchema);

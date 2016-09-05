const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const User = require('./users');

const DocumentSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    unique: true
  },
  content: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  modifiedAt: {
    type: Date,
    default: Date.now()
  },
  roleId: {
    type: Schema.Types.ObjectId,
    ref: 'Role'
  }
});

module.exports = mongoose.model('Document', DocumentSchema);

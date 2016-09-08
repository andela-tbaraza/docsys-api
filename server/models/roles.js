const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const RoleSchema =  new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    enum: ['public', 'user', 'admin']
  }
});


module.exports = mongoose.model('Role', RoleSchema);

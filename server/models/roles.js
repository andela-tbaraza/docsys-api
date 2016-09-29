const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    enum: ['public', 'user', 'admin', 'superUser']
  }
});


module.exports = mongoose.model('Role', RoleSchema);

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name : {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    }
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true
    // validate: function (email) {
    //   return /^\S+@[a-zA-Z0-9-]+(?:\.\w+)*$/.test(email)}
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('User', UserSchema);

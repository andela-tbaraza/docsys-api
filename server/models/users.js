const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new mongoose.Schema({
  name : {
    first: {
      type: String,
      required: true
    },
    last: {
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
    required: true,
    unique: true
    // validate: function (email) {
    //   return /^\S+@[a-zA-Z0-9-]+(?:\.\w+)*$/.test(email)}
  },
  password: {
    type: String,
    required: true
    // select: false
  }
});

// hash the password before the user is saved
UserSchema.pre('save', function(next) {
  let user = this;

  // hash the password only if it's new or modified
  if(!user.isModified('password')  || !user.isNew) {
    return next();
  }

  // else generate the hash
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if(err) {
      return next(err);
    }

    //the user password is the hashed one
    user.password = hash;
    next();
  });
});

// method to compare a given password with the database hash
UserSchema.methods.comparePassword = function(password) {
  let user = this;
  return bcrypt.compareSync(password, user.password);
};


module.exports = mongoose.model('User', UserSchema);

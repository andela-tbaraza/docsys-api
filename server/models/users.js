const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

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
  },
  title: {
    type: String,
    required: true,
    ref: 'Role'
  }
});

// UserSchema.plugin(require('mongoose-role'), {
//   roles: ['public', 'user', 'admin'],
//   accessLevels: {
//     'public': ['public', 'user', 'admin'],
//     'anon': ['public'],
//     'user': ['user', 'admin'],
//     'admin': ['admin']
//   }
// });


// var User = mongoose.model('User', UserSchema);
//
// var newUser = new User({email: 'email@email.com', role: 'user'});
//
// // The string passed in is an access level
// console.log(newUser.role);
// console.log(newUser.hasAccess('public')); // true
// console.log(newUser.hasAccess('anon')); // false
// console.log(newUser.hasAccess('user')); // true
// console.log(newUser.hasAccess('admin')); // false
// console.log(newUser.hasAccess([ 'public', 'user' ])); // true
// console.log(newUser.hasAccess([ 'public', 'anon' ])); // false (because the user isn't a part of 'anon' access level)
//

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

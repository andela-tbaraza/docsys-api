const User = require('../models/users');
const jwt = require('jsonwebtoken');
const secret = 'IdontKnOw';

module.exports = {
  // Adding a new user
  create: function(req, res) {
    // create an instance of Users models
    const user = new User();

    //values to be added to the new Users instance
    user.name.first = req.body.first;
    user.name.last = req.body.last;
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;

    // save user created and check for errors
    user.save(function(err) {
      if(err) {
        // duplicate entry
        if(err.code == 11000) {
          return res.json({ success: false, message: 'That username already exists' });
        }
        res.send(err);
      }
      //if no error encountered return created user
      res.json({message: 'user created'});
    });
  },

  retrieve: function(req, res) {
    User.find(function(err, users) {
      if(err)
        res.send(err);

      res.json(users);
    });
  },

  findUser: function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if(err)
        res.send(err);

      res.json(user);
    });
  },

  updateUser: function(req, res){
    User.findById(req.params.user_id, function(err, user) {
      if(err) {
        res.send(err);
      }

      // update the user info only if it's new
      if(req.body.first) user.name.first = req.body.first;
      if(req.body.last) user.name.last = req.body.last;
      if(req.body.username) user.username = req.body.username;
      if(req.body.email) user.email = req.body.email;
      if(req.body.password) user.password = req.body.password;

      //save the user
      user.save(function(err) {
        if(err)
          res.send(err);

        //return message
        res.json({message: 'user updated'});

      });
    });
  },

  deleteUser: function(req, res) {
    User.remove({
      _id: req.params.user_id
    }, function(err) {
      if(err) {
        res.send(err);
      }
      // else return a message
      res.json({message: 'successfully deleted the user'});
    });
  },

  authenticateUser: function(req, res) {
    // find the user by name, username and password
    User.findOne({
      username: req.body.username
    }).select('email username password').exec(function(err, user) {
      if(err) {
        throw err;
      }

      // if the user with that username is not found
      if(!user) {
        res.json({
          success: false,
          message: 'Authentication failed. User not found'
        });

      } else if(user) {
        // compare the password to see if they match
        let validPassword = user.comparePassword(req.body.password);
        if(!validPassword) {
          res.json({
            success: false,
            message: 'Authentication failed. Wrong password'
          });
        }
        // if authentication is successful
        else {
          // create a token
          let token = jwt.sign({
            username: user.username,
            email: user.email
          }, secret, {
            expiresIn: '24h' // token expires in 24 hrs
          });

          // return this data including the token
          res.json({
            success: true,
            message: 'here is your token',
            token: token
          });
        }
      }
    });
  }

};

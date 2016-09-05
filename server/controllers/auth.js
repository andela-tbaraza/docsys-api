const User = require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = {

  authenticateUser: function(req, res) {
    // find the user by name, username and password
    User.findOne({
      username: req.body.username
    }).select('email username password title').exec(function(err, user) {
      if (err) {
        throw err;
      }

      // if the user with that username is not found
      if (!user) {
        res.json({
          success: false,
          message: 'Authentication failed. User not found'
        });

      } else if (user) {
        // compare the password to see if they match
        let validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
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
            email: user.email,
            _id: user._id,
            title: user.title
          }, config.secret, {
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

const User = require('../models/users');
const jwt = require('jsonwebtoken');

module.exports = {

  authenticateUser: ((req, res) => {
    // find the user by name, username and password
    User.findOne({
      username: req.body.username
    }).select('email username password title').exec((err, user) => {
      if (err) {
        res.status(400).send({
          message: err
        });
      }

      // if the user with that username is not found
      if (!user) {
        res.status(404).json({
          message: 'Authentication failed. User not found'
        });
      } else if (user) {
        // compare the password to see if they match
        const validPassword = user.comparePassword(req.body.password);
        if (!validPassword) {
          res.status(401).json({
            message: 'Authentication failed. Wrong password'
          });
        } else {
          // if authentication is successful create a token
          const token = jwt.sign({
            username: user.username,
            email: user.email,
            _id: user._id,
            title: user.title
            // viewId: user.viewId
          }, process.env.SECRET_KEY, {
            expiresIn: '24h' // token expires in 24 hrs
          });

          // return this data including the token
          res.json({
            success: true,
            message: 'your token expires in 24 hours',
            token: token
          });
        }
      }
    });
  })
};

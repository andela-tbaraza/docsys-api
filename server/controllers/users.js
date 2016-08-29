const User = require('../models/users');

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

    // save user created
    user.save(function(error) {
      if(error) {
        return res.send(error);
      }
      //if no error encountered return created user
      return res.json({message: 'user created'});
    });
  },

  retrieve: function(req, res) {
    User.find(function(err, users) {
      if(err)
        res.send(err);

      res.json(users);
    });
  }

};

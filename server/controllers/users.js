const Users = require('../models/users');

module.exports = {
  // Adding a new user
  create: function(req, res) {
    // create an instance of Users models
    var user = new Users();

    //values to be added to the new Users instance
    user.name.first = req.body.firstName;
    user.name.last = req.body.lastname;
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;

    // save user created
    user.save(function(error) {
      if(error) {
        return parseError(res, error);
      }
      //if no error encountered return created user
      return res.json(user);
    });
  }
};

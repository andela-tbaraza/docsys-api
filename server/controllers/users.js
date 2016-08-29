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
        res.send(error);
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

  find_user: function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if(err)
        res.send(err);

      res.json(user);
    });
  },

  update_user: function(req, res){
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
  }
};

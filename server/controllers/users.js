const User = require('../models/users');



module.exports = {
  // Adding a new user
  create: function(req, res) {
    // create an instance of User model
    const user = new User();

    //values to be added to the new Users instance
    user.name.first = req.body.first;
    user.name.last = req.body.last;
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.title =  req.body.role;

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
      res.json({message: 'user created', user: user});
    });
  },

  retrieve: function(req, res) {
    User.find(function(err, users) {
      // console.log(User.roles)
      if(err) {
        res.send(err);
      }
      res.json(users);
      // res.json({
      //   message: 'not authorised'
      // });
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
  }

};

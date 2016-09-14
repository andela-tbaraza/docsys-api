const User = require('../models/users');
const Document = require('../models/documents');

module.exports = {
  // Adding a new user
  create: ((req, res) => {
    // create an instance of User model
    const user = new User();

    // values to be added to the new Users instance
    user.name.firstname = req.body.firstname;
    user.name.lastname = req.body.lastname;
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;

    if (req.body.role) {
      user.role = req.body.role;
    }

    // save user created and check for errors
    user.save((err) => {
      if (err) {
        // duplicate entry
        if (err.code === 11000) {
          return res.json({ success: false, message: 'That username already exists' });
        }
        return res.send(err);
      }
      // if no error encountered return created user
      return res.json({ success: true, message: 'user created', user: user });
    });
  }),

  retrieve: ((req, res) => {
    User.find((err, users) => {
      // console.log(User.roles)
      if (err) {
        return res.send(err);
      }
      return res.json({ success: true, users: users });
      // res.json({
      //   message: 'not authorised'
      // });
    });
  }),

  findUser: ((req, res) => {
    User.findById(req.params.user_id, ((err, user) => {
      if (err) {
        return res.send(err);
      }
      return res.json(user);
    }));
  }),

  updateUser: ((req, res) => {
    User.findById(req.params.user_id, ((err, user) => {
      if (err) {
        res.send(err);
      }

      // update the user info only if it's new
      if (req.body.firstname) user.name.firstname = req.body.firstname;
      if (req.body.lastname) user.name.lastname = req.body.lastname;
      if (req.body.username) user.username = req.body.username;
      if (req.body.email) user.email = req.body.email;
      if (req.body.password) user.password = req.body.password;

      // save the user
      user.save((error) => {
        if (error) {
          return res.send(error);
        }
        // return message
        return res.json({ message: 'user updated' });
      });
    }));
  }),

  deleteUser: ((req, res) => {
    User.remove({
      _id: req.params.user_id
    }, (err) => {
      if (err) {
        return res.send(err);
      }
      // else return a message
      return res.json({ message: 'successfully deleted the user' });
    });
  }),

  findDocuments: ((req, res) => {
    Document.find({
      ownerId: req.params.id
    }, ((err, documents) => {
      if (err) {
        res.send(err);
      }
      res.json(documents);
    }));
  })

};

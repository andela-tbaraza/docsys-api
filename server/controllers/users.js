/* eslint-disable consistent-return*/

const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Document = require('../models/documents');
const access = require('../middlewares');

const rbac = access.rbac;

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

    if (req.body.title) {
      const roles = ['public', 'user', 'admin', 'superUser'];
      if (roles.indexOf(req.body.title) === -1) {
        res.status(400).send({
          message: 'Invalid role'
        });
      } else {
        user.title = req.body.title;
      }
    }

    // save user created and check for errors
    user.save((err) => {
      if (err) {
        // duplicate entry
        if (err.code === 11000) {
          return res.status(409).json({
            message: 'That username already exists'
          });
        }
        res.status(400).send({
          error: err
        });
      } else {
        const token = jwt.sign({
          username: user.username,
          email: user.email,
          _id: user._id,
          title: user.title
            // viewId: user.viewId
        }, process.env.SECRET_KEY, {
          expiresIn: '24h' // token expires in 24 hrs
        });
        // if no error encountered return created user
        return res.status(201).json({
          message: 'user created',
          user: user,
          tokenDetails: {
            token: token,
            message: 'your token expires in 24 hours'
          }
        });
      }
    });
  }),

  findAll: ((req, res) => {
    rbac.can(req.decoded.title, 'users:get:all', ((err, can) => {
      if (err || !can) {
        rbac.can(req.decoded.title, 'user:get', ((err, can) => {
          if (err || !can) {
            res.status(401).json({
              message: 'Not authorized',
              error: err
            });
          } else {
            User.findById(req.decoded._id, ((err, user) => {
              if (err) {
                res.status(404).send({
                  error: err
                });
              }
              return res.status(200).json({
                user: user
              });
            }));
          }
        }));
      } else {
        User.find((err, users) => {
          if (err) {
            res.status(400).send({
              error: err
            });
          }
          return res.status(200).json({
            users: users
          });
        });
      }
    }));
  }),

  findUser: ((req, res) => {
    User.findById(req.params.user_id, ((err, user) => {
      if (err) {
        return res.status(404).json({
          message: 'user not found'
        });
      }
      return res.status(200).json({
        user: user
      });
    }));
  }),

  updateUser: ((req, res) => {
    User.findByIdAndUpdate(req.params.user_id, {
      $set: {
        name: {
          firstname: req.body.firstname,
          lastname: req.body.lastname
        },
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      }
    }, {
      new: false
    }, ((err, user) => {
      if (err) {
        res.status(400).send({
          error: err
        });
      } else {
        // save the user
        user.save((err) => {
          if (err) {
            res.status(400).send({
              error: err
            });
          } else {
            // return message
            return res.status(200).json({
              message: 'user updated',
              user: user
            });
          }
        });
      }
    }));
  }),

  deleteUser: ((req, res) => {
    User.remove({
      _id: req.params.user_id
    }, (err) => {
      if (err) {
        res.status(401).send({
          error: err
        });
      }
      // else return a message
      return res.status(200).json({
        message: 'successfully deleted the user'
      });
    });
  }),

  findDocuments: ((req, res) => {
    Document.find({
      ownerId: req.params.id
    }, ((err, documents) => {
      if (err) {
        res.status(401).send({
          error: err
        });
      }
      res.status(200).json({
        documents: documents
      });
    }));
  })
};

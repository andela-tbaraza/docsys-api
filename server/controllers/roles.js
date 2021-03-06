/* eslint-disable consistent-return*/

const Role = require('../models/roles.js');

module.exports = {
  create: ((req, res) => {
    const role = new Role();
    role.title = req.body.title;
    role.save((err) => {
      if (err) {
        if (err.code === 11000) {
          return res.status(409).json({
            message: 'That role already exists' });
        }
        res.status(400).send({
          error: err
        });
      } else {
        res.status(201).json({
          message: 'successfully created the role',
          role: role
        });
      }
    });
  }),

  findRoles: ((req, res) => {
    Role.find((err, roles) => {
      if (err) {
        res.status(400).send({
          error: err
        });
      }
      return res.status(200).json({
        roles: roles
      });
    });
  }),

  findRole: ((req, res) => {
    Role.findById(req.params.role_id, ((err, role) => {
      if (err) {
        res.status(400).send({
          error: err
        });
      }
      return res.status(200).json({
        role: role
      });
    }));
  }),

  deleteRole: ((req, res) => {
    Role.remove({ _id: req.params.role_id }, (err) => {
      if (err) {
        res.status(400).send({
          error: err
        });
      }
      res.status(200).json({
        message: 'successfully deleted role'
      });
    });
  })
};

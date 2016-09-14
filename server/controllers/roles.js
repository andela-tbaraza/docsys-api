const Role = require('../models/roles.js');

module.exports = {
  create: ((req, res) => {
    const role = new Role();
    role.title = req.body.title;

    role.save((err) => {
      if (err) {
        res.send(err);
      }

      res.json({
        success: true,
        message: 'successfully created the role'
      });
    });
  }),

  findRole: ((req, res) => {
    Role.find((err, roles) => {
      if (err) {
        res.send(err);
      }
      return res.send(roles);
    });
  }),

  deleteRole: ((req, res) => {
    Role.remove({ _id: req.params.role_id }, (err) => {
      if (err) {
        res.send(err);
      }
      res.json({
        success: true,
        message: 'successfully deleted role'
      });
    });
  })
};

const Role = require('../models/roles.js');

module.exports = {
  create: ((req, res) => {
    const role = new Role();
    role.title = req.body.title;
    console.log(req.body.title);

    role.save((err) => {
      if (err) {
        if (err.code === 11000) {
          return res.json({
            success: false,
            message: 'That role already exists' });
        }
        res.send(err);
      } else {
        res.json({
          success: true,
          message: 'successfully created the role',
          role: role
        });
      }
    });
  }),

  findRole: ((req, res) => {
    Role.find((err, roles) => {
      if (err) {
        res.send(err);
      }
      return res.json({ success: true, roles: roles });
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

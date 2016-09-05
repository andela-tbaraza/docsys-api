const Role = require('../models/roles.js');

module.exports = {
  create: function(req, res) {
    const role = new Role();
    role.title = req.body.title;

    role.save(function(err) {
      if(err) {
        res.send(err);
      }

      res.json({
        success: true,
        message: 'successfully created the role'
      });
    });
  },

  find: function(Req, res) {
    Role.find(function(err, roles) {
      if(err) {
        res.send(err);
      }
      res.send(roles);
    });
  }
};

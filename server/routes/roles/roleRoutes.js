const controller = require('../../controllers/roles');
const access = require('../../middlewares');

module.exports = (router) => {
  router.post('/roles', access.roleAccess(), controller.create);
  router.get('/roles', access.roleAccess(), controller.findRoles);
  router.get('/roles/:role_id', access.roleAccess(), controller.findRole);
  router.delete('/roles/:role_id', access.roleAccess(), controller.deleteRole);
};

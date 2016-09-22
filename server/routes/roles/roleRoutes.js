const controller = require('../../controllers/roles');
const daemon = require('../../middlewares');

module.exports = (router) => {
    // POST /roles
  router.post('/roles', controller.create);

    // GET /roles
  router.get('/roles', controller.findRole);

  // DELETE /roles
  router.delete('/roles/:role_id', daemon.hasAccess(['admin']), controller.deleteRole);
};

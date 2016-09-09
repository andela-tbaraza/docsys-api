const controller = require('../../controllers/users');
const daemon = require('../../middlewares');

module.exports = (router) => {
  // GET /users
  router.get('/users', daemon.userAccess(['admin']), controller.retrieve);

  // GET /users/:user_id
  router.get('/users/:user_id', daemon.hasAccess(['user', 'admin'], 'userId', 'params'), controller.findUser);

  // PUT /users/:user_id
  router.put('/users/:user_id', daemon.hasAccess(['user', 'admin'], 'userId', 'params'), controller.updateUser);

  // DELETE /users/:user_id
  router.delete('/users/:user_id', daemon.hasAccess(['user', 'admin'], 'userId', 'params'), controller.deleteUser);

  // GET /users/:id/documents
  router.get('/users/:id/documents', daemon.hasAccess(['admin', 'user'], 'userId', 'params'), controller.findDocuments);

};

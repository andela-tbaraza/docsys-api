const controller = require('../../controllers/users');
const hasAccess = require('../../middlewares/access');

module.exports = (router) => {
  // GET /users
  router.get('/users', hasAccess(['admin']), controller.retrieve);

  // GET /users/:user_id
  router.get('/users/:user_id', hasAccess(['user', 'admin']), controller.findUser);

  // PUT /users/:user_id
  router.put('/users/:user_id', hasAccess(['user', 'admin']), controller.updateUser);

  // DELETE /users/:user_id
  router.delete('/users/:user_id', hasAccess(['user', 'admin']), controller.deleteUser);

  // GET /users/:id/documents
  router.get('/users/:id/documents', hasAccess(['admin', 'user']), controller.findDocuments);

};

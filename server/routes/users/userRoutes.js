const controller = require('../../controllers/users');
const access = require('../../middlewares');

module.exports = (router) => {
  // GET all users
  router.get('/users', controller.findAll);

  // GET users based on id
  router.get('/users/:user_id', access.userAccess(), controller.findUser);

  // PUT update user
  router.put('/users/:user_id', access.userAccess(), controller.updateUser);

  // DELETE user
  router.delete('/users/:user_id', access.userAccess(), controller.deleteUser);

  // GET /users/:id/documents
  router.get('/users/:id/documents', access.userAccess(), controller.findDocuments);
};

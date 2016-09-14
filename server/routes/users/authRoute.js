const controller = require('../../controllers/users');
const authController = require('../../controllers/auth');


module.exports = (router) => {
  // POST /users
  router.post('/users', controller.create);

  // authenticate user
  router.post('/login', authController.authenticateUser);
};

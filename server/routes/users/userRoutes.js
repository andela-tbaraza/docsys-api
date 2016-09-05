const controller = require('../../controllers/users');

function hasAccess(accessLevel) {
  return function (req, res, next) {
    if (accessLevel.indexOf(req.decoded.title) > -1) {
      return next();
    } else {
      return res.json({
        success: false,
        error: 'Unauthorized'
      });
    }

  };
}

module.exports = (router) => {
  // GET /users
  router.get('/users', hasAccess(['admin']), controller.retrieve);

  // GET /users/:user_id
  router.get('/users/:user_id', hasAccess(['user', 'admin']), controller.findUser);

  // PUT /users/:user_id
  router.put('/users/:user_id', hasAccess(['user', 'admin']), controller.updateUser);

  // DELETE /users/:user_id
  router.delete('/users/:user_id', hasAccess(['user', 'admin']), controller.deleteUser);
};

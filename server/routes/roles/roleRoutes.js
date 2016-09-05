const controller = require('../../controllers/roles');

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
  router.post('/roles', hasAccess(['admin']),controller.create);
  router.get('/roles', hasAccess(['admin']), controller.find);
};

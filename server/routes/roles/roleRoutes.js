const controller = require('../../controllers/roles');
const hasAccess = require('../../middlewares/access');

module.exports = (router) => {
  router.post('/roles', hasAccess(['admin']),controller.create);
  router.get('/roles', hasAccess(['admin']), controller.find);
};

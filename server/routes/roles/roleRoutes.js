const controller = require('../../controllers/roles');
const daemon = require('../../middlewares');

module.exports = (router) => {
  router.post('/roles', daemon.hasAccess(['admin']),controller.create);
  router.get('/roles', daemon.hasAccess(['admin']), controller.find);
};

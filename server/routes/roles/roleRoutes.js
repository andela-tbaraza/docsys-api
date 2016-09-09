const controller = require('../../controllers/roles');
const daemon = require('../../middlewares');

module.exports = (router) => {
    // POST /roles
  router.post('/roles', daemon.hasAccess(['admin']),controller.create);

    // GET /roles
  router.get('/roles', daemon.hasAccess(['admin']), controller.find);
  
};

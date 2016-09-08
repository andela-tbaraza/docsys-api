const controller = require('../../controllers/documents');
const daemon = require('../../middlewares');

module.exports = (router) => {
  // POST /documents
  router.post('/documents', daemon.hasAccess(['user', 'admin'], 'userId', 'params'), controller.create);

  // GET /documents
  router.get('/documents', daemon.hasAccess(['user', 'admin'], 'userId', 'params'), controller.find);

  // GET /documents/:document_id
  router.get('/documents/:document_id', daemon.hasAccess(['admin', 'user'], 'userId', 'params'), controller.findDocument);

  // PUT  /documents/:document_id
  router.put('/documents/:document_id', daemon.hasAccess(['admin', 'user'], 'userId', 'params'), controller.updateDocument);

  // DELETE /documents/:document_id
  router.delete('/documents/:document_id', daemon.hasAccess(['admin', 'user'], 'userId', 'params'), controller.deleteDocument);

  // GET /documents/:limit
  router.get('/documents/:limit', daemon.hasAccess(['admin', 'user'], 'userId', 'params'), controller.findByLimit);

  // GET /documents/:role
  router.get('/documents/:role', daemon.hasAccess(['admin', 'user'], 'userId', 'params'), controller.findByRole);

  // GET /document/:date
  router.get('/documents/:date/:limit', daemon.hasAccess(['admin', 'user'], 'userId', 'params'), controller.findByDate);

};

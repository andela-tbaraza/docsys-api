const controller = require('../../controllers/documents');
const hasAccess = require('../../middlewares/access');

module.exports = (router) => {
  // POST /documents
  router.post('/documents', hasAccess(['user', 'admin']), controller.create);

  // GET /documents
  router.get('/documents', hasAccess(['user', 'admin']), controller.find);

  // GET /documents/:document_id
  router.get('/documents/:document_id', hasAccess(['admin', 'user']), controller.findDocument);

  // PUT  /documents/:document_id
  router.put('/documents/:document_id', hasAccess(['admin', 'user']), controller.updateDocument);

  // DELETE /documents/:document_id
  router.delete('/documents/:document_id', hasAccess(['admin', 'user']), controller.deleteDocument);
};

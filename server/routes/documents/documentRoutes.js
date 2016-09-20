const controller = require('../../controllers/documents');
const access = require('../../middlewares');

module.exports = (router) => {
  // POST /documents
  router.post('/documents', access.userAccess(['user', 'admin']), controller.create);

  // GET /documents
  router.get('/documents', controller.findAll);

  // GET /documents/:document_id
  router.get('/documents/:document_id', access.docAccess(['admin', 'user'], 'params'), controller.findDocument);

  // PUT  /documents/:document_id
  router.put('/documents/:document_id', access.docAccess(['admin', 'user'], 'params'), controller.updateDocument);

  // DELETE /documents/:document_id
  router.delete('/documents/:document_id', access.docAccess(['admin', 'user'], 'params'), controller.deleteDocument);
};

// 57e0d545f4df7de509f7659d

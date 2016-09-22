const controller = require('../../controllers/documents');
const access = require('../../middlewares');

module.exports = (router) => {
  // POST /documents
  router.post('/documents', controller.create);

  // GET /documents
  router.get('/documents', controller.findAll);

  // GET /documents/:document_id
  router.get('/documents/:document_id', access.docAccess(), controller.findDocument);

  // PUT  /documents/:document_id
  router.put('/documents/:document_id', access.docAccess(), controller.updateDocument);

  // DELETE /documents/:document_id
  router.delete('/documents/:document_id', access.docAccess(), controller.deleteDocument);
};

// 57e0d545f4df7de509f7659d

const controller = require('../../controllers/documents');
const access = require('../../middlewares');

module.exports = (router) => {
  // POST ceate documents
  router.post('/documents', controller.create);

  router.get('/mydocuments', controller.findMyDocs);

  // GET all documents
  router.get('/documents', controller.findAll);


  // GET document based on id
  router.get('/documents/:document_id', access.docAccess(), controller.findDocument);

  // UPDATE document based on id
  router.put('/documents/:document_id', access.docAccess(), controller.updateDocument);

  // DELETE document based on id
  router.delete('/documents/:document_id', access.docAccess(), controller.deleteDocument);
};


const controller = require('../../controllers/documents');

function hasAccess(accessLevel) {
  return function (req, res, next) {
    if (accessLevel.indexOf(req.decoded.title) > -1) {
      return next();
    }
    return res.json({
      success: false,
      error: 'Unauthorized'
    });
  };
}

module.exports = (router) => {
  // POST /documents
  router.post('/documents', hasAccess(['user', 'admin']), controller.create);

  // GET /documents
  router.get('/documents', hasAccess('admin'), controller.find);

  // GET /documents/:document_id
  router.get('/documents/:document_id', hasAccess(['admin', 'user']), controller.findDocument);

  // PUT  /documents/:document_id
  router.put('/documents/:document_id', hasAccess(['admin', 'user']), controller.updateDocument);

  // DELETE /documents/:document_id
  router.delete('/documents/:document_id', hasAccess(['admin', 'user']), controller.deleteDocument);
};

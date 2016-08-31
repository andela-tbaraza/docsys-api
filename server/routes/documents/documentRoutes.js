const express = require('express');
const router = express.Router();
const controller = require('../../controllers/documents');

// POST /documents
router.post('/documents', controller.create);

// GET /documents
router.get('/documents', controller.find);

// GET /documents/:document_id
router.get('/documents/:document_id', controller.findDocument);

// PUT  /documents/:document_id
router.put('/documents/:document_id', controller.updateDocument);

module.exports = router;

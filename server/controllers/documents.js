const Document = require('../models/documents');

module.exports = {
  // adding a new document
  create: function(req, res) {
    const document = new Document(); // creating an instance of Document model

    // values to be added to new instance
    document.title = req.body.title;
    document.content = req.body.content;

    // save the document and check for errors
    document.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({
        message: 'document created'
      });
    });
  },

  find: function(req, res) {
    Document.find(function(err, documents) {
      if (err) {
        res.send(err);
      }
      res.json(documents);
    });

  },

  findDocument: function(req, res) {
    Document.findById(req.params.document_id, function(err, document) {
      if (err) {
        res.send(err);
      }
      res.json(document);
    });
  },

  updateDocument: function(req, res) {
    Document.findById(req.params.document_id, function(err, document) {
      if (err) {
        req.send(err);
      }

      // update the document only if it's new
      // document.title = req.body.title;
      // document.content = req.body.content;

      // if(document.isModified('title') || document.isModified('content')) {
      //   document.title = req.body.title;
      //   document.content = req.body.content;
      if (req.body.title) document.title = req.body.title;
      if (req.body.content) document.content = req.body.content;

      // save the document
      document.save(function(err) {
        if (err) {
          res.send(err);
        }

        res.json({
          message: 'document updated'
        });
      });
      // res.json({
      //   message: 'no change has been made to the document'
      // });
    });

  },

  deleteDocument: function(req, res) {
    Document.remove({
      _id: req.params.document_id
    }, function(err) {
      if(err) {
        res.send(err);
      }

      // else return a message
      res.json({message: 'successfully deleted the document'});
    });
  }


};

const Document = require('../models/documents');
const Role = require('../models/roles');



module.exports = {
  // adding a new document
  create: function(req, res) {

    Role.findOne({
      title: req.decoded.title
    }).select('_id').exec(function(err, id) {
      if (err) {
        throw err;
      } else {
        const document = new Document(); // creating an instance of Document model
        // values to be added to new instance
        document.title = req.body.title;
        document.content = req.body.content;
        document.ownerId = req.decoded._id; //     console.log(req.decoded);
        document.roleId = id;
        document.view = req.body.view;

        // save the document and check for errors
        document.save(function(err) {
          if (err) {
            res.send(err);
          }
          res.json({
            message: 'document created',
            document: document
          });
        });
      }
    });



  },

  find: function(req, res) {
    if (req.decoded.title == 'user') {
      Document.find({
        $or: [ { ownerId: req.decoded._id}, { view: 'public'} ]
      }, function(err, documents) {
        if (err) {
          res.send(err);
        }
        res.json(documents);
      });
    } else {
      Document.find(function(err, documents) {
        if (err) {
          res.send(err);
        }
        res.json(documents);
      });
    }

// $or: [ { status: "A" }, { age: { $lt: 30 } } ]

  },


  findDocument: function(req, res) {
    Document.findById(req.params.document_id, function(err, document) {
      // console.log(Role)
      // console.log(Document)
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
      if (err) {
        res.send(err);
      }

      // else return a message
      res.json({
        message: 'successfully deleted the document'
      });
    });
  },

  findByLimit: function(req, res) {
    let limit = req.headers['limit'] || req.query.limit || req.params.limit;
    if (limit) {
      limit = parseInt(limit);
      Document.aggregate(
          { $sort: { createdAt: -1 } }, { $limit: limit},
        function(err, documents) {
          if (err) {

            res.send(err);
          }
          res.json(documents);
          // console.log(documents)
        });
    } else {
      res.json({
        success: false,
        message: 'no limit specified'
      });
    }

  },

  findByRole: function(req, res) {
    let limit = req.headers['limit'];
    limit = parseInt(limit);

    if (limit) {
      // console.log(limit)
      Role.findOne({
        title: req.params.role
      }).select('_id').exec(function(err, id) {
        if (err) {
          // console.log(req.params.role)
          throw(err);
        } else {
          Document.find(
            { roleId : id })
            .limit(limit).exec(function(err, documents) {
              if (err) {
                res.send(err);
              }
              res.json(documents);
            });
        }
      });
    } else {
      res.json({
        success: false,
        message: 'no document found'
      });

    }

  },

  findByDate: function(req, res) {
    // let limit = req.headers['limit'];
    // const limit = parseInt(limit);

    Document.find({
      createdAt: req.params.date
    })
    .limit(parseInt(req.params.limit))
    .exec(function(err, documents) {
      if (err) {
        res.send(err);
      }
      res.json(documents);
    });
  }


};

const Document = require('../models/documents');
const Role = require('../models/roles');

module.exports = {
  // adding a new document
  create: ((req, res) => {
    Role.findOne({
      role: req.decoded.role
    }).select('_id').exec((err, id) => {
      if (err) {
        throw err;
      } else {
        const document = new Document(); // creating an instance of Document model
        // values to be added to new instance
        document.title = req.body.title;
        document.content = req.body.content;
        document.ownerId = req.decoded._id; // console.log(req.decoded);
        document.roleId = id;

        if (req.body.view) {
          document.view = req.body.view;
        }

        // save the document and check for errors
        document.save((error) => {
          if (error) {
            res.send(error);
          }
          res.json({
            message: 'document created',
            document: document
          });
        });
      }
    });
  }),

  find: ((req, res) => {
    let limit = req.query.limit;
    limit = parseInt(limit, 10);
    Document.aggregate(
        { $sort: { createdAt: -1 } }, ((err, documents) => {
          if (err) {
            res.send(err);
          } else if (req.decoded.role === 'user') {
            documents.forEach((doc) => {
              if (doc.ownerId === req.decoded._id || doc.view === 'public') {
                documents = doc
                res.json(documents);
              }
            })
          } else {
            res.json(documents);
          }
        }));


    // if (req.decoded.role === 'user') {
    //   Document.find({
    //     $or: [{ ownerId: req.decoded._id }, { view: 'public' }]
    //   }, ((err, documents) => {
    //     if (err) {
    //       res.send(err);
    //     }
    //     res.json(documents);
    //   }));
    // } else {
    //   Document.find((err, documents) => {
    //     if (err) {
    //       return res.send(err);
    //     }
    //     return res.json(documents);
    //   });
    // }
  }),


  findDocument: ((req, res) => {
    Document.findById(req.params.document_id, ((err, document) => {
      if (err) {
        return res.send(err);
      }
      return res.json(document);
    }));
  }),

  updateDocument: ((req, res) => {
    Document.findByIdAndUpdate(req.params.document_id, { $set: {
      title: req.body.title,
      content: req.body.content }
    }, { new: true }, ((err, document) => {
      if (err) {
        res.send(err);
      }

      // save the document
      document.save((error) => {
        if (error) {
          res.send(error);
        }
        res.json({
          success: true,
          message: 'document updated',
          document: document
        });
      });
    }));
  }),

  deleteDocument: ((req, res) => {
    Document.remove({
      _id: req.params.document_id
    }, (err) => {
      if (err) {
        res.send(err);
      }
      res.json({
        message: 'successfully deleted the document'
      });
    });
  }),

  findByLimit: ((req, res) => {
    let limit = req.query.limit || req.params.limit;
    let skip = req.query.skip || 0;
    if (limit) {
      limit = parseInt(limit, 10);
      skip = parseInt(skip, 10);
      Document.aggregate(
          { $sort: { createdAt: -1 } }, { $limit: limit }, { $skip: skip },
        ((err, documents) => {
          if (err) {
            res.send(err);
          } else if (req.decoded.role === 'user') {
            documents.forEach((doc) => {
              if (doc.ownerId === req.decoded._id || doc.view === 'public') {
                documents = doc
                res.json({ success: true, documents: documents});
              }
            })
          } else {
            res.json({ success: true, documents: documents });
          }
          // console.log(documents)
        }));
    } else {
      res.json({
        success: false,
        message: 'no limit specified'
      });
    }
  }),

  findByRole: ((req, res) => {
    let limit = req.headers.limit;
    limit = parseInt(limit, 10);

    if (limit) {
      // console.log(limit)
      Role.findOne({
        title: req.params.role
      }).select('_id').exec((err, id) => {
        if (err) {
          // console.log(req.params.role)
          throw (err);
        } else {
          Document.find(
            { roleId: id })
            .limit(limit).exec((error, documents) => {
              if (error) {
                res.send(error);
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
  }),

  findByDate: ((req, res) => {
    // let limit = req.headers['limit'];
    // const limit = parseInt(limit);

    Document.find({
      createdAt: req.query.date
    })
    .limit(parseInt(req.params.limit, 10))
    .exec((err, documents) => {
      if (err) {
        res.send(err);
      }
      res.json(documents);
    });
  })


};

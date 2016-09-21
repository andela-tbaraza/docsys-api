const Document = require('../models/documents');
const Role = require('../models/roles');

module.exports = {
  // adding a new document
  create: ((req, res) => {
    Role.findOne({
      title: req.decoded.title
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
            if (error.code === 11000) {
              res.json({ success: false, message: 'that title already exists' });
            } else {
              res.send(error);
            }
          } else {
            res.json({
              message: 'document created',
              document: document
            });
          }
        });
      }
    });
  }),

  findAll: ((req, res) => {
    const date = req.query.date;
    let limit = req.query.limit || req.params.limit;
    let skip = req.query.skip || 0;
    if (date && limit) {
      Document.find({
        createdAt: date
      })
      .limit(parseInt(limit, 10))
      .exec((err, documents) => {
        if (err) {
          res.send(err);
        }
        res.json(documents);
      });
    } else if (limit) {
      limit = parseInt(limit, 10);
      skip = parseInt(skip, 10);
      Document.find().sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)
        .find({ $or: [{ ownerId: req.decoded._id }, { view: 'public' }]
      }, ((err, documents) => {
        if (err) {
          res.send(err);
        }
        res.json(documents);
      }));
    } else {
      Document.find().sort({ createdAt: -1 }).find({
        $or: [{ ownerId: req.decoded._id }, { view: 'public' }]
      }, ((err, documents) => {
        if (err) {
          res.send(err);
        }
        console.log(req);
        res.json(documents);
      }));
    }
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
  })

};

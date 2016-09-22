const Document = require('../models/documents');
const RBAC = require('easy-rbac');

const opts = {
  user: {
    can: ['doc:create', 'docs:get', 'user:create', 'user:get', {
      name: 'doc:delete&update',
      when: (params, callback) => {
        setImmediate(params.userId === params.ownerId);
      }
    }, {
      name: 'user:delete&update',
      when: (params, callback) => {
        setImmediate(params.userId === params.id);
      }
    }
  ] },
  admin: {
    can: ['rule the server', 'doc:delete&update:any', 'docs:get:all', 'user:deleted&update:any', 'users:get:all'],
    inherits: ['user']
  }
};
const rbac = new RBAC(opts);

module.exports = {
  rbac: rbac,

  userAccess: (user_id) => {
    return ((req, res, next) => {
      req.params.userId = user_id;
      rbac.can(req.decoded.title, 'user:deleted&update:any', ((err, can) => {
        if (err || !can) {
          rbac.can(req.decoded.title, 'user:delete&update', { userId: req.decoded._id, id: user_id }, ((err, can) => {
            if (err || !can) {
              res.json({ success: false, message: 'Not authorized', err: err });
            } else {
              return next();
            }
          }));
        } else {
          return next();
        }
      }));
    });
  },

  docAccess: (docId) => {
    return (req, res, next) => {
      req.params.document_id = docId;
      Document.findById(docId).select('ownerId').exec((err, id) => {
        if (err) {
          throw err;
        } else {
          const idObject = id
          rbac.can(req.decoded.title, 'doc:delete&update:any', ((err, can) => {
            if (err || !can) {
              // we are not allowed
              rbac.can(req.decoded.title, 'doc:delete&update', { userId: req.decoded._id, ownerId: idObject.ownerId }, (err, can) => {
                if (err || !can) {
                  res.json({ success: false, message: 'Not authorized', err: err })
                } else {
                  // we are allowed
                  return next();
                }
              });
            } else {
                // we are allowed
              return next();
            }
          }));
        }
      });
    };
  }
};

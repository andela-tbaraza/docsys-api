const Document = require('../models/documents');
const RBAC = require('easy-rbac');

const opts = {
  user: {
    can: ['doc:create', 'docs:get', 'user:create', 'user:get', {
      name: 'doc:delete&update',
      when: (params, callback) => {
        setImmediate(callback, null, params.userId.toString() === params.ownerId.toString());
      }
    }, {
      name: 'user:delete&update',
      when: (params, callback) => {
        setImmediate(callback, null, params.userId === params.id);
      }
    }
  ] },
  admin: {
    can: ['rule the server', 'doc:delete&update:any', 'docs:get:all', 'user:deleted&update:any', 'users:get:all', 'role:create:delete:update:get'],
    inherits: ['user']
  }
};
const rbac = new RBAC(opts);

module.exports = {
  rbac: rbac,

  userAccess: (userId) => {
    return ((req, res, next) => {
      userId = req.params.user_id || req.params.id;
      rbac.can(req.decoded.title, 'user:deleted&update:any', ((err, can) => {
        if (err || !can) {
          rbac.can(req.decoded.title, 'user:delete&update', { userId: req.decoded._id, id: userId }, ((err, can) => {
            if (err || !can) {
              res.status(401).json({ message: 'Not authorized', err: err });
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
    return ((req, res, next) => {
      docId = req.params.document_id;
      Document.findById(docId).select('ownerId').exec((err, idObject) => {
        if (err) {
          res.status(400).send({
            message: err
          });
        } else {
          rbac.can(req.decoded.title, 'doc:delete&update:any', (err, can) => {
            if (err || !can) {
              rbac.can(req.decoded.title, 'doc:delete&update', { userId: req.decoded._id, ownerId: idObject.ownerId }, (err, can) => {
                if (err || !can) {
                  res.status(401).json({ message: 'Not authorized', err: err });
                } else {
                  return next();
                }
              });
            } else {
              return next();
            }
          });
        }
      });
    });
  },

  roleAccess: () => {
    return ((req, res, next) => {
      rbac.can(req.decoded.title, 'role:create:delete:update:get', (err, can) => {
        if (err || !can) {
          res.status(401).json({ message: 'Not authorized', err: err });
        } else {
          return next();
        }
      });
    });
  }
};

const Document = require('../models/documents');
var RBAC = require('easy-rbac');

const opts = {
  user: {
    can: ['doc:create', 'docs:get', {
      name: 'doc:delete&update',
      when: (params, callback) => {
        setImmediate(params.user_id === params.ownerId);
      }
    }
  ] },
  admin: {
    can: ['rule the server', 'doc:delete&update:any', 'docs:get:all'],
    inherits: ['user']
  }
}
var rbac = new RBAC(opts);

module.exports = {
  rbac: rbac,
  hasAccess: ((accessLevel, userId, params) => {
    return ((req, res, next) => {
      if (accessLevel.indexOf(req.decoded.title) > -1) {
        if (req.decoded.title === 'user') {
          params = req.params.user_id;
          userId = req.decoded._id;

          if (userId !== params) {
            res.send({
              message: 'Not authorized'
            });
          } else {
            return next();
          }
        } else {
          return next();
        }
      }
    });
  }),

  docAccess: ((docId) => {
    return (req, res, next) => {
      docId = req.params.document_id;
      Document.findById(docId).select('ownerId').exec((err, id) => {
        if (err) {
          throw err;
        } else {
          const idObject = id
          rbac.can(req.decoded.title, 'doc:delete&update:any', (err, can) => {
            console.log('------',req.decoded.title);
            if (err || !can) {
              // we are not allowed
              rbac.can(req.decoded.title, 'doc:delete&update', { user_id: req.decoded._id, ownerId: idObject.ownerId }, (err, can) => {
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
          });
        }
      });
    };
  }),

  userAccess: ((accessLevel) => {
    return function (req, res, next) {
      if (accessLevel.indexOf(req.decoded.title) > -1) {
        return next();
      } else {
        return res.json({
          success: false,
          message: 'Not authorized'
        });
      }
    };
  })

};

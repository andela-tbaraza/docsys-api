const Document = require('../models/documents');

module.exports = {
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

  docAccess: ((accessLevel, params) => {
    return function(req, res, next) {
      params = req.params.document_id;
      Document.findById(params).select('ownerId').exec((err, id) => {
        if (err) {
          throw err;
        } else {
          if (accessLevel.indexOf(req.decoded.title) >  -1) {
            if (req.decoded.title === 'user') {
              const ownerId = id.ownerId;
              if (ownerId !== req.decoded._id) {
                res.send({
                  success: false,
                  message: 'Not authorized'
                });
              } else {
                return next();
              }
            } else {
              return next();
            }
          }
        }
      });
    };
  }),

  userAccess: ((accessLevel) => {
    return function (req, res, next) {
      if (accessLevel.indexOf(req.decoded.title) > -1) {
        return next();
      } else {
        console.log(req.decoded.title);
        return res.json({
          success: false,
          message: 'Not authorized'
        });
      }
    };
  })

};

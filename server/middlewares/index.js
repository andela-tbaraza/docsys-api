module.exports ={
  hasAccess: function hasAccess(accessLevel, userId, params) {
    return function(req, res, next) {
      for (let level of accessLevel) {
        if ( level === 'user') {
          params = req.params.user_id;
          userId = req.decoded._id;

          if(userId === params) {
            return next();
          }
        } else {
          return next();

        }

      }
    };

  }
};

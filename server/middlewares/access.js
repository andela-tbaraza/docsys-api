module.exports =
  function hasAccess(accessLevel) {
    return function (req, res, next) {
      if (accessLevel.indexOf(req.decoded.title) > -1) {
        return next();
      }
      return res.json({
        success: false,
        error: 'Unauthorized'
      });
    };
  };

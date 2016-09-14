/* eslint-disable global-require*/
const jwt = require('jsonwebtoken');
const config = require('../../config.js');

module.exports = (router) => {
  // test route to make sure everything is working
  router.get('/', ((req, res) => {
    res.json({
      message: 'yaaay! you will like it here'
    });
  }));

  require('./users/authRoute')(router);

  // middleware to use for all requests
  router.use((req, res, next) => {
    // console.log(res);

    // check for the token in the header, post parameters or url parameters
    const token = req.headers['x-access-token'] || req.body.token || req.param.token;

    // when token is found
    if (token) {
      // check expiration and verify the secret
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.status(403).send({
            success: false,
            message: 'failed to authenticate token'
          });
        } else {
          // save the token for use with the other requests
          req.decoded = decoded;
          // make sure we go to the next routes and don't stop here
          next();
        }
      });
    } else {
      // if there is no token
      return res.status(403).send({
        success: false,
        message: 'no token provided'
      });
    }
    // next();
  });

  require('./users/userRoutes')(router);
  require('./documents/documentRoutes')(router);
  require('./roles/roleRoutes')(router);

  return router;
};

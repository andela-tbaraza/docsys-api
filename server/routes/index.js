var express = require('express');
var router = express.Router();
const userRoutes = require('./users/userRoutes');
const authRoute = require('./users/authRoute');
const jwt = require('jsonwebtoken');
const config = require('../../config.js');
const documentRoutes = require('./documents/documentRoutes');

router.use(authRoute);
// console.log(router)

// middleware to use for all requests
router.use(function(req, res, next) {

  // check for the token in the header, post parameters or url parameters

  let token = req.headers['x-access-token'] || req.body.token || req.param.token;
  // when token is found
  if(token) {
    // check expiration and verify the secret
    jwt.verify(token, config.secret, function(err, decoded) {
      if(err) {
        return res.status(403).send({
          success: false,
          message: 'failed to authenticate token'
        });
      } else {
        // save the token for use with the other requests

        req.decoded = decoded;

        next(); // make sure we go to the next routes and don't stop here
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

router.use(userRoutes);
router.use(documentRoutes);

module.exports = router;

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var users = require('../models/users.js');

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
//
// module.exports = router;

/* GET /todos listing. */
router.get('/', function(req, res, next) {
  users.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

/* POST /todos */
router.post('/', function(req, res, next) {
  users.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;

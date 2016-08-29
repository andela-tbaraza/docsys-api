var express = require('express');
var router = express.Router();

var controller = require('../../controllers/users');

// POST /user
router.post('/users', controller.create);

// GET /user(s)
router.get('/users', controller.retrieve);

// GET /user/:user_id
router.get('/users/:user_id', controller.find_user);

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
//
// module.exports = router;

/* GET /users listing. */
// router.get('/', function(req, res, next) {
//   users.find(function(err, users) {
//     if (err) return next(err);
//     res.json(users);
//   });
// });
//


module.exports = router;

var express = require('express');
var router = express.Router();

var controller = require('../../controllers/users');



// GET /users
router.get('/users', controller.retrieve);

// GET /users/:user_id
router.get('/users/:user_id', controller.findUser);

// PUT /users/:user_id
router.put('/users/:user_id', controller.updateUser);

// DELETE /users/:user_id
router.delete('/users/:user_id', controller.deleteUser);


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

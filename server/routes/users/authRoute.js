var express = require('express');
var router = express.Router();

var controller = require('../../controllers/users');
var authController = require('../../controllers/auth');

// POST /users
router.post('/users', controller.create);
// authenticate user
router.post('/login', authController.authenticateUser);

module.exports = router;

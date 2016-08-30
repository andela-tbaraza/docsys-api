var express = require('express');
var router = express.Router();

var authController = require('../../controllers/auth');

// authenticate user
router.post('/login', authController.authenticateUser);

module.exports = router;

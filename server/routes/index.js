const userRoutes = require('./users');
var express = require('express');
var router = express.Router();

router.use(userRoutes);

module.exports = router;

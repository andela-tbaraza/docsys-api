const userRoutes = require('./users/userRoutes');
var express = require('express');
var router = express.Router();

router.use(userRoutes);

module.exports = router;

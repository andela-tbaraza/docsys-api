/* eslint-disable no-console */

const express = require('express');
const app = express(); // define our app using express
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json


const port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR application
// const router = express.Router(); // get an instance of the express Router

var router = require('./server/routes/index');

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working
// router.get('/', function(req, res) {
//   res.json({message: 'yaaay! you will like it here'});
// });
// Handle all routes
// router(app);
// app.use('/', router);


// more routes later

// connect to MongoDB
mongoose.connect('mongodb://localhost/docsys-api')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

// all our routes will be prefixed with api
app.use('/api', router);


//Starting the server
app.listen(port);
console.log('We are on port ' + port);

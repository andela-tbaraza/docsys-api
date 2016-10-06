/* eslint-disable no-console */
/* eslint-disable global-require */
/* eslint-disable new-cap */

if (!process.env.DATABASE_URL_TEST) {
  require('dotenv').load();
}
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./server/routes');

const app = express(); // define our app using express

if (process.env.NODE_ENV !== 'test') {
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('Connection succesful');
  })
  .catch((err) => {
    console.error(err);
  });
}

app.use(morgan('dev'));

// Enable CORS from client-side
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
const port = process.env.PORT || 8080;        // set our port

// all our routes will be prefixed with api
app.use('/api', routes(express.Router()));

// Starting the server
app.listen(port);

console.log('We are on port ', port);
module.exports = app;

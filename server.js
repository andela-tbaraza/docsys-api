/* eslint-disable no-console */
if (!process.env.DATABASE_URL_TEST) {
  require('dotenv').load();
}

const express = require('express');
const app = express(); // define our app using express
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config.js');

// connect to MongoDB
const databaseUri = process.env.NODE_ENV === 'test' ?
process.env.DATABASE_URL_TEST :
process.env.DATABASE_URL;

mongoose.connect(databaseUri)
.then(() =>  console.log('Connection succesful'))
.catch((err) => console.error(err));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(
  bodyParser.urlencoded(
    { extended: true }
  )); // parse application/x-www-form-urlencoded

app.use(
  bodyParser.json()
); // parse application/json

// const env = process.env.NODE_ENV || 'development';

const port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR application
// const router = express.Router(); // get an instance of the express Router
const routes = require('./server/routes');

// all our routes will be prefixed with api
app.use('/api', routes(express.Router()));

// Handle all routes
// router(app);
// app.use('/', router);
// more routes later

// Starting the server
app.listen(port);
console.log('We are on port ' + port);
module.exports = app;

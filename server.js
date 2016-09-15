/* eslint-disable no-console */
if (!process.env.DATABASE_URL_TEST) {
  require('dotenv').load();
}

const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      morgan = require('morgan');

const app = express(); // define our app using express


// connect to MongoDB
// const databaseUri = process.env.NODE_ENV === 'test' ?
// process.env.DATABASE_URL_TEST :
// process.env.DATABASE_URL;

if (process.env.NODE_ENV !== 'test') {
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.DATABASE_URL)
  .then(() =>  console.log('Connection succesful'))
  .catch((err) => console.error(err));
}

app.use(morgan('dev'));



// Enable CORS from client-side
app.use(function(req, res, next) {
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

console.log('We are on port ', port);
module.exports = app;

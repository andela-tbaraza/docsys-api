/* eslint-disable no-console*/
/* eslint-disable global-require*/
/* eslint-disable consistent-return*/
/* eslint-disable no-unused-vars*/

const _ = require('lodash');
const async = require('async');
const mongoose = require('mongoose');
const chalk = require('chalk');
const path = require('path');

function Seeder() {
  this.connected = false;
}

Seeder.prototype.connect = function (db, cb) {
  const _this = this;

  if (mongoose.connection.readyState === 1) {
    _this.connected = true;
    console.log('Successfully initialized mongoose-seed');
    cb();
  }
  mongoose.connect(db, (err) => {
    // Log Error
    if (err) {
      console.error(chalk.red('Could not connect to MongoDB!'));
      console.log(err);
    } else {
      _this.connected = true;
      console.log('Successfully initialized mongoose-seed');
      cb();
    }
  });
};

Seeder.prototype.loadModels = function (modelPaths) {
  console.log(modelPaths);
  modelPaths.forEach((modelPath) => {
    const model = require(path.resolve(modelPath));
    if (model instanceof Function) {
      model();
    }
  });
};

Seeder.prototype.invalidModelCheck = function (models, cb) {
  const invalidModels = [];

  models.forEach((model) => {
    if (_.indexOf(mongoose.modelNames(), model) === -1) {
      invalidModels.push(model);
    }
  });

  if (invalidModels.length) {
    cb(new Error(`Models not registered in Mongoose: ${invalidModels}`));
  } else {
    cb();
  }
};

Seeder.prototype.clearModels = function (models, cb) {
  if (!this.connected) {
    return new Error('Not connected to db, exiting function');
  }

  let modelNames = [];

  // Convert to array if not already
  if (Array.isArray(models)) {
    modelNames = models;
  } else if (typeof models === 'string') {
    modelNames.push(models);
  } else {
    console.error(chalk.red('Error: Invalid model type'));
    return;
  }

  // Confirm that all Models have been registered in Mongoose
  this.invalidModelCheck(modelNames, (err) => {
    if (err) {
      console.error(chalk.red(`Error: ${err.message}`));
      return;
    }

    // Clear each model
    async.each(modelNames, (modelName, done) => {
      const Model = mongoose.model(modelName);
      Model.remove({}, (err) => {
        if (err) {
          console.error(chalk.red(`Error: ${err.message}`));
          return;
        }
        console.log(`${modelName}'s collection cleared`);
        done();
      });
    }, (err) => {
      // Final async callback
      if (err) {
        return;
      }
      cb();
    });
  });
};

Seeder.prototype.populateModels = function (seedData, callback) {
  if (!this.connected) {
    return new Error('Not connected to db, exiting function');
  }

  const modelNames = _.unique(_.pluck(seedData, 'model'));

  // Confirm that all Models have been registered in Mongoose
  const invalidModels = this.invalidModelCheck(modelNames, (err) => {
    if (err) {
      console.error(chalk.red(`Error: ${err.message}`));
      return;
    }

    // Populate each model
    async.eachOf(seedData, (entry, i, outerCallback) => {
      const Model = mongoose.model(entry.model);
      async.eachOf(entry.documents, (document, j, innerCallback) => {
        Model.create(document, (err) => {
          if (err) {
            console.error(chalk.red(`Error creating document ${j} of ${entry.model} model`));
            console.error(chalk.red(`Error: ${err.message}`));
          } else {
            console.log(`Successfully created document ${j} of ${entry.model} model`);
          }
          innerCallback();
        });
      }, (err) => {
        outerCallback();
      });
    }, (err) => {
      callback();
    });
  });
};

module.exports = new Seeder();

/* eslint-disable global-require*/

if (!process.env.DATABASE_URL_TEST) {
  require('dotenv').load();
}
const seeder = require('mongoose-seed');
const path = require('path');


// During the test the env variable is set to test
process.env.NODE_ENV = 'test';
// Data array containing seed data - documents organized by Model
const data = [{
  model: 'User',
  documents: [{
    'name.firstname': 'tonida',
    'name.lastname': 'baraza',
    username: 'tonee',
    email: 'toni@gmail.com',
    role: 'admin',
    password: 'admin'
  }]
}];
// console.log(mongoose);
module.exports = {
  seeder: () => {
    seeder.connect(process.env.DATABASE_URL_TEST, () => {
      // Connect to MongoDB via Mongoose
      // Load Mongoose models
      seeder.loadModels([
        path.join(__dirname, '../../server/models/users.js'),
        path.join(__dirname, '../../server/models/documents.js')
      ])
      // Clear specified collections
      seeder.clearModels(['User', 'Document'], () => {
          // Callback to populate DB once collections have been cleared
        // console.log('+++++++++', seeder.populateModels(data));
      });
      seeder.populateModels(data);
    });
  }
};

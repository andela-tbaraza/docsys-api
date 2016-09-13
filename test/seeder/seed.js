const seeder = require('mongoose-seed');
const config = require('../../config.js');
const path = require('path');

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Data array containing seed data - documents organized by Model
var data = [
  {
    'model': 'User',
    'documents': [
      {
        'name.first': 'tonida',
        'name.last': 'baraza',
        'username': 'tonee',
        'email': 'toni@gmail.com',
        'title': 'admin',
        'password': 'admin'

      }

    ]
  }
];

module.exports = {
  // Connect to MongoDB via Mongoose

  seeder: seeder.connect(config.test, function() {

    // Load Mongoose models
    seeder.loadModels([
      path.join(__dirname, '../../server/models/users.js' ),
      path.join(__dirname, '../../server/models/documents.js')
    ]);

    // Clear specified collections
    seeder.clearModels(['User', 'Document'], function() {

      // Callback to populate DB once collections have been cleared
      seeder.populateModels(data);
      // console.log('+++++++++', seeder.populateModels(data));

    });
  })

};

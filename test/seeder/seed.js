
const seeder = require('./mongoose-seed');
const path = require('path');
const data = require('./seed-data');

// console.log(mongoose);
module.exports = {
  seeder: (callback) => {
    seeder.connect(process.env.DATABASE_URL_TEST, () => {
      // Connect to MongoDB via Mongoose
      // Load Mongoose models
      seeder.loadModels([
        path.join(__dirname, '../../server/models/users.js'),
        path.join(__dirname, '../../server/models/documents.js'),
        path.join(__dirname, '../../server/models/roles.js')
      ]);
      // Clear specified collections
      seeder.clearModels(['User', 'Document', 'Role'], () => {
        seeder.populateModels(data, () => {
          callback();
        });
          // Callback to populate DB once collections have been cleared
        // console.log('+++++++++', seeder.populateModels(data));
      });
    });
  }
};

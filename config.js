// const env = process.env.NODE_ENV || 'development';
// if (env === 'test') {
//   require('dotenv').load();
// }

module.exports = {
  dev_database: process.env.DATABASE_URL,
  test_database: process.env.DATABASE_URL_TEST,
  secret: process.env.SECRET_KEY
};

/* eslint-disable no-undef*/
// const assert = chai.assert;
const seed = require('../seeder/seed.js');
var request = require('supertest');
let server = require('../../server.js');
const should = require('should');

// var server = supertest.agent('http://localhost:8080');

// const users = require('../../server/models/users');
// chai.use(request);

beforeEach((done) => {
  seed.seeder();
  done();
});

describe('User', () => {
  it('should validate that a new user created is unique', (done) => {
    request(server)
    // server
     .post('/api/users')
     .send({'first': 'tonida',
     'last': 'baraza',
     'username': 'tonee',
     'email': 'toni@gmail.com',
     'title': 'admin',
     'password': 'admin'})
     .expect('Content-Type', /json/)
     .expect(200)
     .end((err, res) => {
       res.body.message.should.equal('That username already exists');
       res.body.success.should.equal(false);
       res.status.should.equal(200);
     });
    done();
  });
});

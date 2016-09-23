/* eslint-disable no-undef*/
const seed = require('../seeder/seed.js');
const server = require('../../server.js');
const request = require('supertest');
const should = require('should');
let token;

// var server = supertest.agent('http://localhost:8080');

// const users = require('../../server/models/users');
// chai.use(request);

before((done) => {
  const cb = () => {
    request(server)
      .post('/api/login')
      .send({
        username: 'tonee',
        password: 'admin'
      })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  };
  seed.seeder(cb);
});

describe('User', () => {
  it('should validate that a new user created is unique', (done) => {
    request(server)
      .post('/api/users')
      .send({
        firstname: 'tonida',
        lastname: 'baraza',
        username: 'tonee',
        email: 'toni@gmail.com',
        title: 'user',
        password: 'admin'
      })
      .expect('Content-Type', /json/)
      .end((err, res) => {
        res.body.message.should.equal('That username already exists');
        res.body.success.should.equal(false);
        res.status.should.equal(409);
        done();
      });
  });

  it('should validate that a new user created has a role defined', (done) => {
    request(server)
      .post('/api/users')
      .send({
        firstname: 'Mark',
        lastname: 'Zuckerberg',
        username: 'zuck',
        email: 'zuck@gmail.com',
        password: 'zuck'
      })
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          res.send(err);
          done();
        }
        res.body.message.should.equal('user created');
        res.body.success.should.equal(true);
        res.body.user.should.have.property('title');
        res.status.should.equal(200);
        done();
      });
  });

  it('should validate that a new user created has both first and last names', (done) => {
    request(server)
      .post('/api/users')
      .send({
        firstname: 'Jacckline',
        lastname: 'Kimani',
        username: 'jacky',
        email: 'jacky@gmail.com',
        password: 'MK4'
      })
      .expect('Content-Type', /json/)
      .end((err, res) => {
        res.body.message.should.equal('user created');
        res.body.success.should.equal(true);
        res.body.user.name.should.have.keys('firstname', 'lastname');
        res.status.should.equal(200);
        done();
      });
  });


  it('should validate that all users are returned', (done) => {
    request(server)
      .get('/api/users')
      .set('x-access-token', token)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          res.send(err);
          done();
        }
        res.body.success.should.equal(true);
        done();
      });
  });
});

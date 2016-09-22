/* eslint-disable no-undef*/
const server = require('../../server.js');
const request = require('supertest');
const should = require('should');

let token;

// var server = supertest.agent('http://localhost:8080');

// const users = require('../../server/models/users');
// chai.use(request);

// before((done) => {
//   const cb = () => {
//     request(server)
//       .post('/api/login')
//       .send({
//         username: 'tonee',
//         password: 'admin'
//       })
//       .end((err, res) => {
//         token = res.body.token;
//         done();
//       });
//   };
//   // done();
//   // seed.seeder(cb);
// });

beforeEach((done) => {
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
});

describe('Role', () => {
  it('should validate that a new role created has a unique title', (done) => {
    request(server)
    .post('/api/roles')
    .set('x-access-token', token)
    .send({
      title: 'admin'
    })
    .end((err, res) => {
      if (err) {
        res.send(err);
        done();
      }
      console.log(res.body);
      res.body.success.should.equal(false);
      res.body.message.should.equal('That role already exists');
      done();
    });
  });

  it('should validate that all roles are returned when Roles.all is called', (done) => {
    request(server)
    .get('/api/roles')
    .set('x-access-token', token)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        res.send(err);
        done();
      }
      res.body.success.should.equal(true);
      // res.body.roles.should.have.property('role')
      done();
    });
  });
});

/* eslint-disable no-undef*/
const server = require('../../server.js');
const request = require('supertest');
const should = require('should');

let token;

describe('Role', () => {
  before((done) => {
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
      res.status.should.equal(409);
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
      res.status.should.equal(200);
      res.body.roles.length.should.equal(3);
      done();
    });
  });

  it('should validate that an admin can get a specified role based on its id', (done) => {
    request(server)
    .get('/api/roles/57e3a3a0198c7df30279ca5d')
    .set('x-access-token', token)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        res.send(err);
        done();
      }
      res.status.should.equal(200);
      // res.body.roles.length.should.equal(1);
      done();
    });
  });

  it('should validate that an admin can create a role', (done) => {
    request(server)
    .post('/api/roles')
    .set('x-access-token', token)
    .send({
      title: 'public'
    })
    .end((err, res) => {
      res.status.should.equal(201);
      done();
    });
  });

  it('should validate that a 400 status response is returned when creating a role that is not in the enumerated values', (done) => {
    request(server)
    .post('/api/roles')
    .set('x-access-token', token)
    .send({
      title: 'SuperAdmin'
    })
    .end((err, res) => {
      res.status.should.equal(400);
      done();
    });
  });

  // it('should validate that an admin can update a role', (done) => {
  //   request(server)
  //   .put('/api/roles/57e3a3a0198c7df30279ca5d')
  //   .set('x-access-token', token)
  //   .send({
  //     title: 'SuperUser'
  //   })
  //   .end((err, res) => {
  //     res.status.should.equal(200);
  //     done();
  //   });
  // });

  it('should validate that an admin can delete a role', (done) => {
    request(server)
    .delete('/api/roles/57e3a3a0198c7df30279ca5d')
    .set('x-access-token', token)
    .end((err, res) => {
      res.status.should.equal(200);
      done();
    });
  });

//   it('should validate that a 400 status response is returned when getting a role that is not registered', (done) => {
//     request(server)
//     .get('/api/roles/57e3a3a0198c7dr30279ca5c')
//     .set('x-access-token', token)
//     .end((err, res) => {
//       // if (err) {
//       //   res.send(err);
//       //   done();
//       // }
//       console.log(res.body);
//       console.log(res.status);
//       // res.status.should.equal(400);
//       // res.body.roles.length.should.equal(1);
//       done();
//     });
//   });
});

describe('Role access', () => {
  before((done) => {
    request(server)
    .post('/api/login')
    .send({
      username: 'rael',
      password: '12RaeL34'
    })
    .end((err, res) => {
      token = res.body.token;
      done();
    });
  });

  it('should validate that a user is not authorised to create a role', (done) => {
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
      res.status.should.equal(401);
      res.body.message.should.equal('Not authorized');
      done();
    });
  });
});

/* eslint-disable no-undef*/

const seed = require('../seeder/seed.js');
const server = require('../../server.js');
const request = require('supertest');
const should = require('should');

let token;

before((done) => {
  const cb = () => {
    request(server)
      .post('/api/login')
      .send({
        username: 'tonee',
        password: 'admin'
      })
      .end((err, res) => {
        if (err) {
          res.send(err);
          done();
        }
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
        if (err) {
          res.send(err);
          done();
        }
        res.body.message.should.equal('That username already exists');
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
        res.body.user.should.have.property('title');
        res.status.should.equal(201);
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
        if (err) {
          res.send(err);
          done();
        }
        res.body.message.should.equal('user created');
        res.body.user.name.should.have.keys('firstname', 'lastname');
        res.status.should.equal(201);
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
        res.status.should.equal(200);
        done();
      });
  });

  it('should validate that a user gets a token once registered', (done) => {
    request(server)
      .post('/api/users')
      .send({
        firstname: 'Naomi',
        lastname: 'Campbell',
        username: 'naomi',
        email: 'naomi@gmail.com',
        password: 'Camnam'
      })
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) {
          res.send(err);
          done();
        }
        res.body.message.should.equal('user created');
        res.body.tokenDetails.should.have.keys('token');
        res.status.should.equal(201);
        done();
      });
  });
});

describe('User Details Access', () => {
  before((done) => {
    request(server)
    .post('/api/login')
    .send({
      username: 'alex',
      password: '*dinNNerQ'
    })
    .end((err, res) => {
      if (err) {
        res.send(err);
        done();
      }
      token = res.body.token;
      done();
    });
  });

  it('should validate that a user can get their details', (done) => {
    request(server)
    .get('/api/users/57e2d4b0cbc141731717651b')
    .set('x-access-token', token)
    .end((err, res) => {
      if (err) {
        res.send(err);
        done();
      }
      res.status.should.equal(200);
      res.body.user.should.have.property('username').eql('alex');
      res.body.user.should.have.property('email').eql('alex@gmail.com');
      res.body.user.should.have.property('password');
      res.body.user.should.have.property('title').eql('user');
      res.body.user.should.have.property('name').eql({ firstname: 'Alex', lastname: 'Ogara' });
      done();
    });
  });

  it('should validate that a user can edit their details', (done) => {
    request(server)
    .put('/api/users/57e2d4b0cbc141731717651b')
    .set('x-access-token', token)
    .send({
      email: 'alex@gmail.com'
    })
    .end((err, res) => {
      if (err) {
        res.send(err);
        done();
      }
      res.status.should.equal(200);
      done();
    });
  });

  it('should validate that a user cannot get the details of other users', (done) => {
    request(server)
    .get('/api/users/57e2d4b0cbc141731717651a')
    .set('x-access-token', token)
    .end((err, res) => {
      if (err) {
        res.send(err);
        done();
      }
      res.status.should.equal(401);
      done();
    });
  });

  it('should validate that a user cannot delete the details of another user', (done) => {
    request(server)
    .delete('/api/users/57e2d4b0cbc141731717651a')
    .set('x-access-token', token)
    .end((err, res) => {
      if (err) {
        res.send(err);
        done();
      }
      res.status.should.equal(401);
      done();
    });
  });

  it('should validate that a user can delete their details', (done) => {
    request(server)
    .delete('/api/users/57e2d4b0cbc141731717651b')
    .set('x-access-token', token)
    .end((err, res) => {
      if (err) {
        res.send(err);
        done();
      }
      res.status.should.equal(200);
      res.body.message.should.equal('successfully deleted the user');
      done();
    });
  });

  it('should validate that a user can get all documents he/she has created', (done) => {
    request(server)
    .get('/api/users/57e2d4b0cbc141731717651b/documents')
    .set('x-access-token', token)
    .end((err, res) => {
      if (err) {
        res.send(err);
        done();
      }
      res.status.should.equal(200);
      res.body.documents.length.should.equal(5);
      done();
    });
  });

  it('should validate that a user cannot get the details of all users just theirs', (done) => {
    request(server)
    .get('/api/users')
    .set('x-access-token', token)
    .end((err, res) => {
      if (err) {
        res.send(err);
        done();
      }
      res.status.should.equal(200);
      done();
    });
  });

  it('should return a 403 response if an incorrect or expired token is passed', (done) => {
    token += 'you';
    request(server)
    .get('/api/documents')
    .set('x-access-token', token)
    .end((err, res) => {
      if (err) {
        res.send(err);
        done();
      }
      res.status.should.equal(403);
      res.body.message.should.equal('failed to authenticate token');
      done();
    });
  });
});
describe(' User Authentication', () => {
  it('should validate that a user can access the home route', (done) => {
    request(server)
    .get('/api/')
    .end((err, res) => {
      if (err) {
        res.send(err);
        done();
      }
      res.status.should.equal(200);
      done();
    });
  });

  it('should validate that a 404 response status is returned when login a user that\'s not registered', (done) => {
    request(server)
    .post('/api/login')
    .send({
      username: 'monicah',
      password: 'she knows'
    })
    .end((err, res) => {
      if (err) {
        res.send(err);
        done();
      }
      res.status.should.equal(404);
      done();
    });
  });

  it('should validate that a 401 response status is returned when a user logins in with wrong password', (done) => {
    request(server)
    .post('/api/login')
    .send({
      username: 'rael',
      password: 'wrong'
    })
    .end((err, res) => {
      if (err) {
        res.send(err);
        done();
      }
      res.status.should.equal(401);
      done();
    });
  });

  it('should validate that a 403 response status when a user is accesing protected routes without authentication', (done) => {
    request(server)
    .get('/api/documents')
    .end((err, res) => {
      if (err) {
        res.send(err);
        done();
      }
      res.status.should.equal(403);
      done();
    });
  });
});

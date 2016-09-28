/* eslint-disable no-undef*/

const server = require('../../server.js');
const request = require('supertest');
const should = require('should');

let token;

describe('Document', () => {
  before((done) => {
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
  });
  it('validate that a new document created has a published date defined', (done) => {
    request(server)
      .post('/api/documents')
      .set('x-access-token', token)
      .send({
        title: 'Life',
        content: 'Life is good'
      })
      .end((err, res) => {
        if (err) {
          res.send(err);
          done();
        }
        res.body.document.should.have.property('createdAt');
        res.status.should.equal(201);
        done();
      });
  });

  it('validate that a 400 status response is returned when creating a document without all the required fields', (done) => {
    request(server)
      .post('/api/documents')
      .set('x-access-token', token)
      .send({
        title: 'Love'
      })
      .end((err, res) => {
        if (err) {
          res.send(err);
          done();
        }
        res.status.should.equal(400);
        done();
      });
  });

  it('should validate that a user can specify the view permissions of a document', () => {
    request(server)
    .post('/api/documents')
    .set('x-access-token', token)
    .send({
      title: 'Cyber security',
      content: 'This is a very serious topic',
      view: 'public'
    })
    .end((err, res) => {
      if (err) {
        res.send(err);
        done();
      }
      res.status.should.equal(201);
    });
  });

  it('validates that all documents are returned, limited by a specified number', (done) => {
    request(server)
      .get('/api/documents?limit=2')
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) {
          res.send(err);
          done();
        }
        res.status.should.equal(200);
        res.body.documents.length.should.equal(2);
        done();
      });
  });

  it('validates that all documents created on a specific date are returned, limited by a limit', (done) => {
    request(server)
    .get('/api/documents?date=2016-09-21T18:42:56.322Z&limit=2')
    .set('x-access-token', token)
    .end((err, res) => {
      if (err) {
        res.send(err);
        done();
      }
      res.status.should.equal(200);
      res.body.documents.length.should.equal(2);
      res.body.documents[0].should.have.property('createdAt').eql('2016-09-21T18:42:56.322Z');
      res.body.documents[1].should.have.property('createdAt').eql('2016-09-21T18:42:56.322Z');
      done();
    });
  });

  it('should validate that documents titles are unique', (done) => {
    request(server)
    .post('/api/documents')
    .set('x-access-token', token)
    .send({
      title: 'Penny',
      content: 'I know what she wants'
    })
    .end((err, res) => {
      if (err) {
        res.send(err);
        done();
      }
      res.status.should.equal(409);
      done();
    });
  });

  it('should validate that only the admin is able to view all documents', (done) => {
    request(server)
    .get('/api/documents')
    .set('x-access-token', token)
    .end((err, res) => {
      if (err) {
        res.send(err);
        done();
      }
      res.status.should.equal(200);
      res.body.documents.length.should.equal(15);
      done();
    });
  });
});


describe('Document access', () => {
  before((done) => {
    request(server)
    .post('/api/login')
    .send({
      username: 'rael',
      password: '12RaeL34'
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

  it('should validate that a user view their documents and only public documents of other users', (done) => {
    request(server)
    .get('/api/documents')
    .set('x-access-token', token)
    .end((err, res) => {
      if (err) {
        res.send(err);
        done();
      }
      res.status.should.equal(200);
      res.body.documents.length.should.equal(9);
      done();
    });
  });

  it('should validate that a user cannot view private documents of other users', (done) => {
    request(server)
    .get('/api/documents/57e3f5260749b7a707b5e366')
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

  it('should validate that a user cannot delete other users documents', (done) => {
    request(server)
    .delete('/api/documents/57e3f5260749b7a707b5e366')
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

  it('should validate that a user cannot update other users documents', (done) => {
    request(server)
    .put('/api/documents/57e39f108dbb818002cd6d53')
    .set('x-access-token', token)
    .send({
      title: 'New title',
      content: 'New content'
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

  it('should validate that a user can get all documents created on a specified date limited by a specified number', (done) => {
    request(server)
    .get('/api/documents?date=2016-09-16T12:20:06.877Z&limit=2')
    .set('x-access-token', token)
    .end((err, res) => {
      if (err) {
        res.send(err);
        done();
      }
      res.status.should.equal(200);
      res.body.documents.length.should.equal(2);
      done();
    });
  });

  it('should validate that a user can get documents in chunks', (done) => {
    request(server)
    .get('/api/documents?page=2&limit=2')
    .set('x-access-token', token)
    .end((err, res) => {
      if (err) {
        res.send(err);
        done();
      }
      res.status.should.equal(200);
      res.body.documents.length.should.equal(2);
      done();
    });
  });

  it('should validate that a user can delete their own document', (done) => {
    request(server)
    .delete('/api/documents/57e3f5260749b7a707b5e367')
    .set('x-access-token', token)
    .end((err, res) => {
      if (err) {
        res.send(err);
        done();
      }
      res.status.should.equal(200);
      res.body.message.should.equal('successfully deleted the document');
      done();
    });
  });

  it('should validate that a user can update their own document', (done) => {
    request(server)
    .put('/api/documents/57dbe376edaf099250e17b94')
    .set('x-access-token', token)
    .send({
      title: 'New title today',
      content: 'God is good, all the time'
    })
    .end((err, res) => {
      if (err) {
        res.send(err);
        done();
      }
      res.status.should.equal(200);
      res.body.message.should.equal('successfully updated document');
      res.body.document.title.should.equal('New title today');
      res.body.document.content.should.equal('God is good, all the time');
      done();
    });
  });

  it('should validate that a user can  get their own document specified by the id', (done) => {
    request(server)
    .get('/api/documents/57ddc4a5873c5ec457e1c20a')
    .set('x-access-token', token)
    .end((err, res) => {
      if (err) {
        res.send(err);
        done();
      }
      res.status.should.equal(200);
      res.body.document.should.have.property('title').eql('today12');
      res.body.document.should.have.property('content').eql('today1');
      res.body.document.should.have.property('view').eql('private');
      res.body.document.should.have.property('updatedAt').eql('2016-09-17T22:33:09.026Z');
      res.body.document.should.have.property('createdAt').eql('2016-09-17T22:33:09.026Z');
      done();
    });
  });

  it('should validate that a 401 status response is returned when supplying the wrong id', (done) => {
    request(server)
    .get('/api/documents/57ddc4a5')
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
});

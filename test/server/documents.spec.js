/* eslint-disable no-undef*/

const server = require('../../server.js');
const request = require('supertest');
const should = require('should');

// const Role = require('../../server/models/roles.js');

let token;

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

describe('Document', () => {
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
        // console.log(res.body);
        res.body.document.should.have.property('createdAt');
        done();
      });
  });

  it('validates that all documents are returned, limited by a specified number', (done) => {
    request(server)
      .get('/api/documents?limit=2')
      .set('x-access-token', token)
      // .query({ page: 1 })
      // .query({ limit: '2' })
      .end((err, res) => {
        if (err) {
          res.send(err);
          done();
        }
        res.body.success.should.equal(true);
        console.log(res.body);
        done();
      });
  });
});

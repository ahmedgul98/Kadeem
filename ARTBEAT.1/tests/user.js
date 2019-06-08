let mongoose = require("mongoose");
let User = require('../models/user');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);

describe('Users', () => {
beforeEach((done) => {
User.remove({}, (err) => {
  done();
});
    });
  
    describe('/GET user', () => {
  it('it should GET all the users', (done) => {
chai.request(server)
    .get('/')
    .end((err, res) => {
  res.should.have.status(200);
  res.body.should.be.a('array');
  res.body.length.should.be.eql(0);
      done();
    });
  });
  });


  describe('/PUT/:id user', () => {
  it('it should update a user given an id', (done) => {
  let user = new User({ username: "mujtaba", password: "123"})
  user.save((err, user) => {
    chai.request(server)
    .put('/user/' + user.id)
    .send({ username: "mujtaba ", password: "123"})
    .end((err, res) => {
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.should.have.property('message').eql('User updated');
      done();
    });
  });
  });
  });
  
});

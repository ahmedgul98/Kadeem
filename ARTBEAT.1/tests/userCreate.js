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
 
    describe('/POST user', () => {
        it('it should not create a user without email address', (done) => {
            let user = {
                
              username: "mujtaba",
              password: "123"
            }
              chai.request(server)
              .post('/login')
              .send(user)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.emailAddress.should.have.property('kind').eql('required');
                done();
              });
        });
       
        it('it should create a user ', (done) => {
          let user = {
              username: "mujtaba",
              password: "123"
          }
              chai.request(server)
              .post('/register')
              .send(user)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User successfully created');
                    res.body.user.should.have.property('username');
                done();
              });
        });
    });
});

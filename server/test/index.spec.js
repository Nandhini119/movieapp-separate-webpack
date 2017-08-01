var request = require('supertest');
var expect = require('chai').expect;
var sinon = require('sinon');
var model = require('../models/movie.js');
var signup = require('../models/signup.js');
let movieSearch = require('../controller/moviecontrol');
let signupControl = require('../controller/logincontrol');
var modelStub = sinon.stub(model, 'findOne');
var signupStub = sinon.stub(signup, 'findOne');
var app = require('../index.js');
var address = request("http://localhost:3000");
 
  /*describe('Test my controller', function() {
  describe('Find items', function() {
        beforeEach(function() {
            modelStub.yields(null, [{
                'email':'nandhini@gmail.com',
                'firstname':'nandhini'
                
            }]);
        });
        it('should attempt to find items', function(done) {
            request(app)
                .post('/authen/signup')
                .expect(200)
                .end(function(err, res) {
                    console.log(res.body);
                    if (err) 
                    return done(err);
                    //Enter your assertions here           
                    expect(res.body[0].firstname).to.be.equal("nandhini");
                    done();
                });
        });
    });


    describe('Finds the user in Database ', function(done) {
        beforeEach(function(done) {
           signupStub.withArgs({email:'nandhini@gmail.com'}).returns({'firstname':'nandhini'});
        });
        it('Matches the User', function(err) {
            request(app)
                .post('/authen/signup')
                .expect(200)
                .end(function(err, res) {
                    console.log(res.body);
                    if (err) return done(err);
                    //Enter your assertions here 
                   expect(signupStub({email:'nandhini@gmail.com'}).firstname).to.be.equal('nandhini'); 
                    done();
                });
        });
    });
});*/
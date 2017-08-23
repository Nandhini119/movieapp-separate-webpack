var request = require('supertest');
var expect = require('chai').expect;
var sinon = require('sinon');
var model = require('../models/movie.js');
var signup = require('../models/signup.js');
let movieSearch = require('../controller/moviecontrol');
let signupControl = require('../controller/logincontrol');
var modelStub = sinon.stub(model, 'find');
var signupStub = sinon.stub(signup, 'find');
var app = require('../index.js');
var url = request("http://localhost:3000");

describe("Testing the data from mongoDB", function(err){
    beforeEach(function(){
        signupStub.withArgs({email:'nandhini@gmail.com'}).returns({"password":'nandhini'});
    })
/*checks whether the username has the correct password*/
    it("Retreives data and checks username", function(done){
            url
           .post("/authen/signup")
           .expect(200)
           .end(function(err,res){
             if (err) {
                            throw err;
                    }
             expect(signupStub({email:'nandhini@gmail.com'}).password).to.be.equal("nandhini")
             done();
           });  
    });
  });

);*/
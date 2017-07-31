let chai = require('chai');
let expect = chai.expect;
let movieControl = require('../controller/moviecontrol');
let signupControl = require('../controller/logincontrol');

describe('Test code for correct output', function() 
 {
    
         it ('Test whether the output of viewfavourite  is an object or not', function(done) 
         {
             expect(typeof movieControl.a).to.deep.equal('object');    
             done();   
             }); 
              it ('Test whether the output of saving new user  is an object or not', function(done) 
         {
             expect(typeof signupControl.a).to.deep.equal('object');    
             done();   
             }); 
    });
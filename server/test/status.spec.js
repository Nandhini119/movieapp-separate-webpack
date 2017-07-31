var should = require("chai").should(),
expect = require("chai").expect,
supertest = require("supertest"), 
app = require("../index"); 
var url = supertest("http://localhost:3000"); 
describe("Testing the route", function(err) {
    it("checking status code for adding", function(done) 
    {
        url      
    .get("/movie/add")    
    .expect(200)      
    .end(function(err,res)   
    {
        done(); 
        });    
        });  
     it("checking status code for deletion", function(done) 
    {
        url      
    .get("/movie/delete")    
    .expect(200)      
    .end(function(err,res)   
    {
        done(); 
        });    
        }); 
         it("checking status code for deletion", function(done) 
    {
        url      
    .get("/movie/view")    
    .expect(200)      
    .end(function(err,res)   
    {
        done(); 
        });    
        });
         it("checking the type of data",function(done)       
         {
             url  
             .get("/movie/viewall")   
             .expect('Content-Type',/json/)     
             .end(function(err,res)   
             {
                 should.not.exist(err);        
                 var myobj = res.body[0].title; 
        
                 expect(typeof myobj ).to.deep.equal('string');        
                 done();     
                 });   
                 });
     
                });
                
                
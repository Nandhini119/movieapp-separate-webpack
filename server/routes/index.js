var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
/*let signupControl = require('../controller/signupcontrol');*/
let loginControl = require('../controller/logincontrol');
let movieSearch = require('../controller/moviecontrol');

module.exports = function(passport) {

    router.get('/logout', loginControl.logout);
    router.post('/movie/add', movieSearch.favourite);
    router.get('/movie/view', movieSearch.viewfavourite);
     router.get('/movie/viewall', movieSearch.viewallfavourite);
    router.get('/movie/delete', movieSearch.delfavourite);

    return router;
}

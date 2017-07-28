var express = require('express');
var router = express.Router();
let loginControl = require('../controller/logincontrol');
module.exports = function(passport) {
    router.post('/login',
        passport.authenticate('login', {
            session: false
        }), (req, res) => {
            res.send(req.user);
        }
    );

    /* Handle Registration POST  ', */
    router.post('/signup',loginControl.signup);

    return router;
}

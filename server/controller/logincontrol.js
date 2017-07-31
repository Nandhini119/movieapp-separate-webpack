let loginschema = require('../models/signup');
let authenuser = {};
module.exports = {

    logout: function(req, res) {

        req.session.destroy(function(err) {

            if (err) {

                console.log("Error");

            } else

            {

                res.send("success");

            }

        });

    },
    signup: function(req, res) {
        console.log("hi");
        var newUser = {

            // set the user's local credentials
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
            email: req.body.email
        }
            loginschema.findOne({
            email: newUser.email
        }, function(err, data) {
            if (data == null) {

                var db = new loginschema(newUser);
                db.save().then((doc) => {
                    authenuser = data;
                    res.send(doc);
                }, (err) => {
                    res.send(err);
                });
            } else {
                res.send(200);
            }
        });
        return authenuser;
        
    },
    a:authenuser
};


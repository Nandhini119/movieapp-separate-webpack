let movieschema = require('../models/movie');

let request = require('request');
let viewfav = {};


module.exports = {

    /*this will add the movie into db when add to favourite button is clicked*/
    favourite: function(req, res) {
        var newfav = {
            title: req.body.title,
            poster_path: req.body.poster_path,
            release_date: req.body.release_date,
            overview: req.body.overview,
            popularity: req.body.popularity,
            email: req.body.email
        };

        movieschema.findOne({
            title: newfav.title,
            email: newfav.email
        }, function(err, data) {
            if (data == null) {

                var db = new movieschema(newfav);
                db.save().then((doc) => {

                    res.send(db);
                }, (err) => {
                    res.send(err);
                });
            } else {
                res.send(200);
            }
        });
    },

    /*this get all the data from the favourite db*/
    viewfavourite: function(req, res) {
        movieschema.find({
            email: req.query.email
        }, function(err, data) {
            if (err)
                throw err;
            else {
                viewfav = data;
                res.status(200).send(data);
            }
        });
        return viewfav;
    },
     viewallfavourite: function(req, res) {
        movieschema.find( function(err, data) {
            if (err)
                throw err;
            else {

                res.status(200).send(data);
            }
        });
    },
    /*delete the movie from the favourite db*/
    delfavourite: function(req, res) {

        var title = req.query.title;
        movieschema.remove({
            title: title,
            email: req.query.email

        }, function(err, data) {
            if (err)
                throw err;
            else {
                status = true;
                res.status(200).send("success");
            }
        });
    },
    
    a : viewfav
   
};

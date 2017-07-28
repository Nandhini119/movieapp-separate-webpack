var mongoose = require('mongoose');

/*schema for movie database*/
module.exports = mongoose.model('moviesreact', {
    title: String,
    poster_path: String,
    release_date: String,
    overview : String,
    popularity : String,
    email:String
});
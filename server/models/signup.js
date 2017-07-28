var mongoose = require('mongoose');

/*schema for signup database*/
module.exports = mongoose.model('signupreact', {
    firstname:{type : String},
    lastname:String,
    password: {type : String,required: true},
    email:  {type : String,required: true,unique : true}
});
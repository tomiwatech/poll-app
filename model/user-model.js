var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var pollUserSchema = new Schema({
        username : String,
        password : String,
        email : String,
        fullname: String,
        phone: String
    },
    {
        timestamps : {createdAt : 'created', updatedAt : 'updated'}
    });

var User = mongoose.model('User', pollUserSchema);

module.exports = {
    'User' : User
}
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var pollUserSchema = new Schema({
        firstname : String,
        lastname: String,
        password : String,
        email : String,
        gender: String,
        phone: Number
    },
    {
        timestamps : {createdAt : 'created', updatedAt : 'updated'}
    });

var User = mongoose.model('User', pollUserSchema);

module.exports = {
    'User' : User
}
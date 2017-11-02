var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var voteSchema = new Schema({
        username : String,
        fullname: String,
        question: String,
        answer: String
    },
    {
        timestamps : {createdAt : 'created', updatedAt : 'updated'}
    });

var Vote = mongoose.model('Vote', voteSchema);

module.exports = {
    'Vote' : Vote
}
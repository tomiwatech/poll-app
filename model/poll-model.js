var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserPollSchema = new Schema({
        username: String,
        question : String,
        options : [String]
    },
    {
        timestamps : {createdAt : 'created', updatedAt : 'updated'}
    });

var Poll = mongoose.model('Poll', UserPollSchema);

module.exports = {
    'Poll' : Poll
}
var Voter = require('../model/vote-model').Vote;

var VoteService = {};

VoteService.authenticateVoter = function (question, next) {
    Voter.findOne({ question: question }, function (err, vote) {
        return next(err, vote);
    });
}

VoteService.findVote = function (id, next) {

    Voter.findOne({ "_id": id }, function (err, vote) {
        return next(err, vote);
    });
}

VoteService.addVote = function (data, next) {

    this.authenticateVoter(data.question, function (err, vote) {
        if (err) {
            console.log('Encountered error when searching if the vote is in the db already');
            return next(err, null);
        }

        if (vote) {
            console.log('vote already exists');
            return next(null, null);
        }
        else {
            /*Add user to db*/
            var newVote = new Voter({
                username: data.username,
                fullname: data.fullname,
                question: data.question,
                answer: data.answer
            });

            newVote.save(function (err, vote) {
                return next(err, vote);
            })
        }
    })
}

VoteService.allVotes = function (next) {
    Voter.find(function (err, votes) {
        return next(err, votes);
    });
}

module.exports = VoteService;
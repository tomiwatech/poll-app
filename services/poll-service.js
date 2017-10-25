var Poll = require('../model/poll-model').Poll;

var PollService = {};

PollService.authenticatePoll = function (data, next) {
    Poll.findOne({ question: data.question }, function (err, poll) {
        return next(err, poll);
    });
}

PollService.findPoll = function (question, next) {

    Poll.findOne({ question: question }, function (err, poll) {
        return next(err, poll);
    });
}

PollService.addPoll = function (data, next) {

    this.findPoll(data.question, function (err, poll) {
        if (err) {
            console.log('Encountered error when searching if poll is in the db already');
            return next(err, null);
        }

        if (poll) {
            console.log('poll already exists');
            return next(null, null);
        }
        else {
            /*Add poll to db*/
            var newPoll = new Poll({
                username: data.username,
                question: data.question,
                options: data.options,
            });

            newPoll.save(function (err, poll) {
                return next(err, poll);
            })
        }
    })
}

PollService.allPolls = function (next) {
    Poll.find(function (err, polls) {
        return next(err, polls);
    });
}

PollService.updateUser = function (userUser, next) {

    User.update({ "_id": userUser._id }, {
        $set:
        {
            "UserName": userUser.UserName,
            "UserPriority": userUser.UserPriority,
            "UserStatus": userUser.UserStatus,
            "UserDescription": userUser.UserDescription
        }
    }, function (err, User) {
        return next(err, User);
    })
}


// delete User with User._id
PollService.deleteUser = function (id, next) {

    User.remove({ "_id": id }, function (err) {
        return next(err);
    });
}

module.exports = PollService;
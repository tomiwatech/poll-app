var User = require('../model/user-model').User;

var UserService = {};

UserService.authenticateUser = function (data, next) {
    User.findOne({ username: data.username }, function (err, user) {
        return next(err, user);
    });
}

UserService.findUser = function (username, next) {

    User.findOne({ username: username }, function (err, user) {
        return next(err, user);
    });
}

UserService.addUser = function (data, next) {

    this.findUser(data.username, function (err, user) {
        if (err) {
            console.log('Encountered error when searching if the user is in the db already');
            return next(err, null);
        }

        if (user) {
            console.log('user already exists');
            return next(null, null);
        }
        else {
            /*Add user to db*/
            var newUser = new User({
                username: data.username,
                password: data.password,
                fullname: data.fullname,
                phone: data.phone,
                email: data.email
            });

            newUser.save(function (err, user) {
                return next(err, user);
            })
        }
    })
}

UserService.allUsers = function (next) {
    User.find(function (err, users) {
        return next(err, users);
    });
}

// UserService.updateUser = function (userUser, next) {

//     User.update({ "_id": userUser._id }, {
//         $set:
//         {
//             "UserName": userUser.UserName,
//             "UserPriority": userUser.UserPriority,
//             "UserStatus": userUser.UserStatus,
//             "UserDescription": userUser.UserDescription
//         }
//     }, function (err, User) {
//         return next(err, User);
//     })
// }


// delete User with User._id
UserService.deleteUser = function (id, next) {

    User.remove({ "_id": id }, function (err) {
        return next(err);
    });
}

module.exports = UserService;
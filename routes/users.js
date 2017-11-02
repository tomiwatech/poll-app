var express = require('express');
var UserService = require('../services/user-service');
var router = express.Router();
var jwt = require('jsonwebtoken');
var app = express();
var config = require('../config');
var User = require('../model/user-model').User;

//
// ---------------------------------------------------------
// SET SECRET for Jwt
// ---------------------------------------------------------
// 
app.set('superSecret', config.secret);


//
// ---------------------------------------------------------
// Enable Cors in User route
// ---------------------------------------------------------
// 

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//
// ---------------------------------------------------------
// Add a new new user
// ---------------------------------------------------------
// 

router.post('/', function (req, res, next) {
    var data = req.body;
    console.log(data.username);
    console.log("post data " + data);
    UserService.addUser(data, function (err, user) {
        if (err) {
            return res.json({
                'responseCode': '03',
                'responseMessage': 'Error adding User'
            });
        }

        if (user) {
            return res.json({
                'responseCode': '00',
                'responseMessage': 'Successfully added a User'
            });
        }

        return res.json({
            'responseCode': '02',
            'responseMessage': 'User exists already'
        });
    });
})

//
// ---------------------------------------------------------
// authenticate middleware
// ---------------------------------------------------------
// 

router.post('/authenticate', function (req, res, next) {
    var data = req.body;
    UserService.authenticateUser(data, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.json({
                responseCode: "02",
                responseMessage: 'Authentication failed. User not found.',
            });
        } else if (user) {
            // check if username matches
            if (user.password != req.body.password) {
                res.json({
                    responseCode: "03",
                    responseMessage: 'Authentication failed. Password not found.',
                });
            } else {
                // if user is found and password is right
                // create a token
                var token = jwt.sign({ data: user }, config.secret, {
                    expiresIn: 1440 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    responseCode: "00",
                    responseMessage: "Authentication Successful",
                    token:token,
                    user:user
                });
            }

        }

    })

});

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
router.use(function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.'});
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }

});



// ---------------------------------------------------------
// authenticated routes
// ---------------------------------------------------------

router.get('/', function (req, res, next) {

    UserService.allUsers(function (err, users) {
        if (err) {
            return res.json({
                'responseCode': '03',
                'responseMessage': 'Error fetching users'
            });
        }

        if (users) {
            return res.json({
                'responseCode': '00',
                'responseMessage': 'Successfully fetched all users',
                'users': users
            });
        }

        return res.json({
            'responseCode': '02',
            'responseMessage': 'No Users in db'
        });
    });
});

//Find One
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    console.log(id);
    UserService.findUser(id, function (err, users) {
        if (err) {
            return res.json({
                'responseCode': '03',
                'responseMessage': 'Error fetching user'
            });
        }
        if (users) {
            return res.json({
                'responseCode': '00',
                'responseMessage': 'Successfully fetched users',
                'User': users
            });
        }
        
        return res.json({
            'responseCode': '02',
            'responseMessage': 'No users in db'
        });
    });
});


/* POST updates a user's record. */
router.post('/update', function (req, res, next) {
    var User = req.body;
    console.log(User.UserName);
    UserService.updateUser(User, function (err, Users) {
        if (err) {
            return res.json({
                'responseCode': '03',
                'responseMessage': 'Error adding user'
            });
        }

        if (Users) {
            return res.json({
                'responseCode': '00',
                'responseMessage': 'Successfully added user'
            });
        }

        return res.json({
            'responseCode': '02',
            'responseMessage': 'User exists already'
        });
    });
})


/* POST deletes a user's record. */
router.delete('/:id', function (req, res, next) {
    var id = req.params.id;
    console.log(id);
    UserService.deleteUser(id, function (err) {
        if(err) {
            return res.json({
                'responseCode': '03',
                'responseMessage': 'Error deleting User'
            });
        }

        return res.json({
            'responseCode': '00',
            'responseMessage': 'Successfully deleted User'
        });
    });
})

module.exports = router;






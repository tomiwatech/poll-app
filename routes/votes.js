var express = require('express');
var VoteService = require('../services/vote-service');
var router = express.Router();
var jwt = require('jsonwebtoken');
var app = express();
var config = require('../config');
var Vote = require('../model/vote-model').Vote;

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
// Add a new new poll
// ---------------------------------------------------------
// 

router.post('/', function (req, res, next) {
    var data = req.body;
    console.log(data);
    VoteService.addVote(data, function (err, vote) {
        if (err) {
            return res.json({
                'responseCode': '03',
                'responseMessage': 'Error adding Vote'
            });
        }

        if (vote) {
            return res.json({
                'responseCode': '00',
                'responseMessage': 'Successfully added a Vote'
            });
        }

        return res.json({
            'responseCode': '02',
            'responseMessage': 'Vote exists already'
        });
    });
})


// ---------------------------------------------------------
// authenticated routes
// ---------------------------------------------------------


router.get('/', function (req, res, next) {

    VoteService.allVotes(function (err, votes) {
        if (err) {
            return res.json({
                'responseCode': '03',
                'responseMessage': 'Error fetching votes'
            });
        }

        if (votes) {
            return res.json({
                'responseCode': '00',
                'responseMessage': 'Successfully fetched all votes',
                'votes': votes
            });
        }

        return res.json({
            'responseCode': '02',
            'responseMessage': 'No vote in db'
        });
    });
});

//Find poll by id
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    console.log(id);
    VoteService.findVote(id, function (err, poll) {
        if (err){
            return res.json({
                'responseCode': '03',
                'responseMessage': 'Error fetching vote for user'
            });
        }
        if (poll) {
            return res.json({
                'responseCode': '00',
                'responseMessage': 'Successfully fetched vote for user',
                'Poll': poll
            });
        } return res.json({
            'responseCode': '02',
            'responseMessage': 'No vote in db for user'
        });
    });
});

module.exports = router;






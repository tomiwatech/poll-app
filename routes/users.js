var express = require('express');
var UserService = require('../services/user-service');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

    UserService.allTasks(function (err, users) {
        if(err){
            return res.json({
                'responseCode': '03',
                'responseMessage' : 'Error fetching users'
            });
        }
        
        if(users){
            return res.json({
                'responseCode': '00',
                'responseMessage' : 'Successfully fetched all users',
                'users' : users
            });
        }

        return res.json({
            'responseCode': '02',
            'responseMessage' : 'No tasks in db'
        });
    });
});

//Find One
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    console.log(id);
    UserService.findTask(id, function (err, users) {
        if(err){
            return res.json({
                'responseCode': '03',
                'responseMessage' : 'Error fetching user'
            });
        }
        if(task){
            return res.json({
                'responseCode': '00',
                'responseMessage' : 'Successfully fetched users',
                'task' : task
            });
        }        return res.json({
            'responseCode': '02',
            'responseMessage' : 'No users in db'
        });
    });
});

/* POST adds an new user. */
router.post('/', function(req, res, next){
    var user = req.body;
    console.log(task.taskName);
    UserService.addTask(user, function(err, users){
        if(err){
            return res.json({
                'responseCode': '03',
                'responseMessage' : 'Error adding task'
            });
        }

        if(users){
            return res.json({
                'responseCode': '00',
                'responseMessage' : 'Successfully added a task'
            });
        }

        return res.json({
            'responseCode': '02',
            'responseMessage' : 'Task exists already'
        });
    });
})


/* POST updates a user's record. */
router.post('/update', function(req, res, next){
    var task = req.body;
    console.log(task.taskName);
    UserService.updateTask(task, function(err, tasks){
        if(err){
            return res.json({
                'responseCode': '03',
                'responseMessage' : 'Error adding user'
            });
        }

        if(tasks){
            return res.json({
                'responseCode': '00',
                'responseMessage' : 'Successfully added user'
            });
        }

        return res.json({
            'responseCode': '02',
            'responseMessage' : 'User exists already'
        });
    });
})


/* POST deletes a user's record. */
router.delete('/:id', function(req, res, next){
    var id = req.params.id;
    console.log(id);
    UserService.deleteTask(id, function(err){
        if(err){
            return res.json({
                'responseCode': '03',
                'responseMessage' : 'Error deleting task'
            });
        }

        return res.json({
            'responseCode': '00',
            'responseMessage' : 'Successfully deleted task'
        });
    });
})

module.exports = router;

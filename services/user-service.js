var User = require('../model/user-model').User;

var UserService = {};

UserService.findTask = function(user_id, next){

    User.findOne({_id : user_id}, function(err, user){
        return next(err, user);
    });
}

UserService.addTask = function(data, next){
    
    this.findTask(data._id, function(err, user){
        if(err){
            console.log('Encountered error when searching if the task is in the db already');
            return next(err, null);
        }

        if(user){
            console.log('User with taskName ' + task.taskName + ' exists already.');
            return next(null, null);
        }
        else{
            /*Add user to db*/
            var newTask = new Task({
                taskName: data.taskName,
                taskDescription: data.taskDescription,
                taskPriority: data.taskPriority,
                taskStatus : data.taskStatus
            });

            newTask.save(function(err, task){
                return next(err, task);
            })
        }
    })
}

UserService.allTasks = function(next){
    User.find(function(err, users){
        return next(err, users);
    });
}

UserService.updateTask = function(usertask, next){

    Task.update({"_id" : usertask._id}, {$set :
     {
        "taskName" : usertask.taskName,
        "taskPriority": usertask.taskPriority,
        "taskStatus": usertask.taskStatus,
        "taskDescription": usertask.taskDescription
    } 
       }, function(err, task){
        return next(err, task);
    })
}


// delete task with task._id
UserService.deleteTask = function (id, next) {

    Task.remove({"_id" : id}, function (err) {
        return next(err);
    });
}

module.exports = UserService;
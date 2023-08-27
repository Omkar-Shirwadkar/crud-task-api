const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');
const TaskList = require('./database/models/tasklist');
const Task = require('./database/models/task');
/*
    CORS: Cross Origin Request Security
    Backend= http://localhost:3000
    Frontend= http://llocalhost:4200
*/
//Third Party Library, app.use(cors());
// Add headers before the routes are defined
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Accept');
    // Pass to next layer of middleware
    next();
});
//Example of Middleware
app.use(express.json());
//Routes or REST API endpoints or RESTFul webservices endpoints
/*
Tasklist - Create, Update, ReadTaskListById, ReadAllTaskList
Task - Create, Update, ReadTaskById, ReadAllTask
*/
//Routes or API endpoints for TaskList model
//GET all TaskLists
// https://localhost:3000/tasklist => [{TaskList},{TaskList}]
app.get('/tasklist', (req,res) => {
    TaskList.find({})
        .then((lists)=>{
            res.status(200).send(lists);
        })
        .catch((error)=>{
            console.log(error);
            res.status(500);
        });
});
//Endpoint to get tasklist by tasklistID
app.get(
    '/tasklist/:tasklistId', (req,res)=>{
        let tasklistId = req.params.tasklistId;
        TaskList.find({_id: tasklistId})
            .then((tasklist)=>{
                res.status(200).send(tasklist);
            })
            .catch((error)=>{
                console.log(error);
            });
});
//PUT is full update of object
app.put('/tasklist/tasklistId', (req,res)=>{
    TaskList.findOneAndUpdate({_id: req.params.tasklistId},{$set : req.body})
        .then((taskList)=>{
            res.status(200).send(taskList);
        })
        .catch((error)=>{
            console.log(error);
        });
});
//PATCH is partial update of one field of an object
app.patch('/tasklist/tasklistId', (req,res)=>{
    TaskList.findOneAndUpdate({_id: req.params.tasklistId},{$set : req.body})
        .then((tasklist)=>{
            res.status(200).send(tasklist);
        })
        .catch((error)=>{
            console.log(error);
        });
});
//Delete a taskList by ID
app.delete('/tasklist/tasklistId', (req,res)=>{
    TaskList.findByIdAndDelete(req.params.tasklistId)
        .then((tasklist)=>{
            res.status(201).send(tasklist);
        })
        .catch((error)=>{
            console.log(error);
        });
});
app.post('/tasklist',(req,res)=>{
    //console.log("Hello I'm inside POST method :)");
    console.log(req.body);
    let taskListObject = {'title': req.body.title};
    TaskList(taskListObject).save()
        .then((lists)=>{
            res.status(201).send(lists);
        })
        .catch((error)=>{
            console.log(error);
            res.status(500);
        });
});
app.listen(3000, () =>{
    console.log("Server started on Port 3000 :)");
});
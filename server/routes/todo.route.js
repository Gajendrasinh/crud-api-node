const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const todos = require('../models/todo.model');
var configDB = require('../config/database.js');

mongoose.Promise = global.Promise;

mongoose.connect(configDB.url, function (err) {  
    if(err){
		console.error('Error! '+err);
	}else{
        console.log("Database connected")
    }
}); 

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('/todos', function(req, res, next) {
   todos.find({}).exec(function(err, todos){
        if(err){
            console.error("Error " +err);
        }else{
            res.json(todos);
        }
   });
});

router.get('/todos/:id', function(req, res, next) {
    todos.findById(req.params.id).exec(function(err, todo){
         if(err){
             console.error("Error " +err);
         }else{
             res.json(todo);
         }
    });
 });

 router.post('/todo', function(req, res, next){
    var newTodo = new todos();
    newTodo.title = req.body.title;
    newTodo.description = req.body.description;
    newTodo.save(function(err, insertedTodo){
        if(err){
            console.log(err);
        }else{
            res.json(insertedTodo);
        }   
    })
 });

 router.put('/todo/:id', function(req, res, next){
    todos.findByIdAndUpdate(req.params.id , {
            $set : {
                title : req.body.title,
                description : req.body.description            
            }
        },
        {
            new : true
        }, 
        function(err, updatedTodo){
            if(err){
                res.send(err);
            }else{
                res.json(updatedTodo)
            }
        }
    )
 });

 router.delete('/todo/:id', function(req, res, next){

    todos.findByIdAndRemove(req.params.id, function(err, deletedTodo) {
        if(err){
            res.send("Error " +err)
        }else{
            res.json(deletedTodo)
        }  
    })
    
 })
module.exports = router;
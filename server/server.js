require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {Todo} = require('./models/todo');


const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

 app.post('/todos',async (req, res)=>{
    const newTodo = new Todo({
        text: req.body.text,
        completed: req.body.completed
    });
    try{
        const doc = await newTodo.save();
        res.status(200).send(doc);
        //console.log(JSON.stringify(doc, undefined, 2));
    }catch(err){
        res.status(400).send(err);
      
    }
 })

 app.get('/todos', async (req, res)=>{
    try{
        const todos = await Todo.find();
        res.status(201).send({todos});
    }catch(err){
        res.status(400).send(err);
    }

 });

 app.get('/todos/:todoId', async (req, res)=>{
     try{
        const todoId = req.params.todoId;

        if(!ObjectID.isValid(todoId)){
            const err = new Error('No valid Id');
            err.statusCode = 404;
            throw err;
        }
        const todo = await Todo.findById(todoId);
        if(!todo){
            const err = new Error('No todo found');
            err.statusCode = 404;
            throw err;
        }
        res.status(200).send({todo});
     }catch(err){
         res.status(404).json({message : err.message, statudCode: err.statusCode});
     }
 })

 app.delete('/todos/:id', async (req, res)=>{
     const todoId = req.params.id;
     try{
        if(!ObjectID.isValid(todoId)){
            const error = new Error('Not valid ID');
            error.statudCode = 404;
            throw error;
        }
        const todo = await Todo.findByIdAndRemove(todoId);
        if(!todo){
            const error = new Error('No todo found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).send({todo}); 
     }catch(err){
         res.status(404).send({message: err.message, statusCode: err.statusCode});
     }
 })

app.patch('/todos/:id', async(req, res)=>{
    const id = req.params.id;
    const body = _.pick(req.body,['text','completed']);
    try{
        if(!ObjectID.isValid(id)){
            const error = new Error('Not valid ID');
            error.statudCode = 404;
            throw error;
        }
        if(_.isBoolean(body.completed) && body.completed){
            body.completedAt = new Date().getTime();
        }else{
            body.completed = false;
            body.completedAt = null;
        }
        const todo = await Todo.findByIdAndUpdate(id,{$set: body},{new: true});
        if(!todo){
            const error = new Error('No todo found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).send({todo})
    }catch(err){
        res.status(404).send({message: err.message, statusCode: err.statusCode});
    }

})

app.listen(port, ()=>{
    console.log(`Started on port ${port}`);
})

module.exports = {app};
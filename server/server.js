const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {Todo} = require('./models/todo');


const app = express();

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

app.listen(3001, ()=>{
    console.log('Started on port 3001');
})

module.exports = {app};
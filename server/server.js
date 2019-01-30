require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {Todo} = require('./models/todo');
const {authenticate} = require('./middleware/authenticate');


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

// POST /users 
    app.post('/users', async(req, res)=>{
        const body = _.pick(req.body, ['email','password']);
        // const user = new User({
        //     email: body.email,
        //     password: body.password
        // })
        const user = new User(body);

        try{
            await user.save();
            const token = await user.generateAuthToken();
            res.header('x-auth',token).send(user) // prefixing x- in header is to create the custom header 
        }catch(err){
            res.status(400).send(err);
        }
    })




app.get('/users/me', authenticate, (req, res)=>{
   res.send(req.user);
})

// POST /users/login {email, password}
app.post('/users/login', async (req, res)=>{
    const body = _.pick(req.body, ['email','password']);
    try{
        const user = await User.findByCredentails(body.email, body.password);
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);

    }catch(err){
        res.status(400).send();
    }

    // 1. promise inner chaining
    // User.findByCredentails(body.email, body.password)
    // .then(user=>{
    //     return user.generateAuthToken()
    //     .then(token=>{
    //         res.header('x-auth', token).send(user);
    //     })
    // })
    // .catch(err=>{
    //     res.status(400).send();
    // })

    // 2. promise outer chaining
    // let authenticatedUser;
    // User.findByCredentails(body.email, body.password)
    // .then(user=>{
    //     authenticatedUser = user
    //     return user.generateAuthToken();
    // }).then(token=>{
    //     res.header('x-auth', token).send(authenticatedUser);
    // })
    // .catch(err=>{
    //     res.status(400).send();
    // })

})

app.listen(port, ()=>{
    console.log(`Started on port ${port}`);
})

module.exports = {app};
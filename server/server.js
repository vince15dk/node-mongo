const express = require('express');
const bodyParser = require('body-parser');

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
app.listen(3001, ()=>{
    console.log('Started on port 3001');
})

module.exports = {app};
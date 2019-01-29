const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

//
// (async ()=>{
//    const result = await Todo.remove({});
//    console.log(result);
// })();

// Todo.findOneAndRemove({}).then(result=>{
//     console.log(result);
// })

// Todo.findByIdAndRemove({_id :'5c504971a199ad118db1c9eb'}).then(todo=>{
//     console.log(todo)
// })

// Todo.findByIdAndRemove('5c504971a199ad118db1c9eb').then(todo=>{
//     console.log(todo)
// })

Todo.findOneAndRemove({text:'something to do'}).then(todo => {
    console.log(todo)
})
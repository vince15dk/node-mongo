const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');
// const id = '5c502c18e216841ae21efcd2';

// if(!ObjectID.isValid(id)){
//     console.log('ID not valid');
// }
// Todo.find({
// }).then(doc=>{
//     console.log(doc);
// });

// Todo.findOne({
//     _id: id
// }).then(todo=>{
//     console.log('todo', todo);
// });

// Todo.findById(id).then(todo=>{
//     console.log('todo', todo);
// });

// (async()=>{
//     try{
//         const todo = await Todo.findById(id);
//         if(!todo){
//             const err = new Error('No todos found')
//             throw err;
//         }
//         console.log('todo', todo);  
//     }catch(err){
//         console.log(err);
//     }
// })();
const userId = '5c5003ae9d82971311ce03b5';

(async ()=>{
    try{
        const user = await User.findById(userId);
        if(!user){
            const err = new Error('No user found');
            throw err;
        }
        console.log(JSON.stringify(user, undefined, 2));
    }catch(err){
        console.log(err);
    }

})();
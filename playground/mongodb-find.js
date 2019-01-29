const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', async (err, client)=>{
    if(err){
       return console.log('Unable to connect to MongoDB server');
    }    
console.log('Connected to MongoDB server');
const db = client.db('TodoApp');

// db.collection('Users').find({_id : new ObjectID('5c4fcd32e07bbf0cd88f6049')}).toArray().then((docs)=>{
//     console.log('User');
//     console.log(JSON.stringify(docs, undefined, 2))
// }).catch(err=>{
//     console.log('Unable to fetch users', err);
// })


// db.collection('Users').find().count().then((count)=>{
//     console.log('User count', count);
    
// }).catch(err=>{
//     console.log('Unable to fetch users', err);
// })
// try{
//     const count = await db.collection('Users').find().count();
//     console.log('User count', count);

// }catch(err){
//     console.log('Unable to fetch users', err);
// }

try{
    const count = await db.collection('Users').find({name:'SJ'}).count();
    console.log('User count', count);

}catch(err){
    console.log('Unable to fetch users', err);
}



client.close();
})

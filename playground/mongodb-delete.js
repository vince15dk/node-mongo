const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', async (err, client)=>{
    if(err){
       return console.log('Unable to connect to MongoDB server');
    }    
console.log('Connected to MongoDB server');
const db = client.db('TodoApp');
// try{
//     //const result = await db.collection('Todos').deleteOne({text: 'Walk the cat'});
//     const result = await db.collection('Todos').findOneAndDelete({completed: false});
//     console.log(result);
// }catch(err){
//     console.log(err)
// }

try{
    const result = await db.collection('Users').findOneAndDelete({_id : new ObjectID('5c4fd0038cfe9d0d079e9979')});
    console.log(result);
}catch(err){
    console.log(err);
}


client.close();
})

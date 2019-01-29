const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', async (err, client)=>{
    if(err){
       return console.log('Unable to connect to MongoDB server');
    }    
console.log('Connected to MongoDB server');
const db = client.db('TodoApp');

// try{
//     const result = await db.collection('Todos')
//     .findOneAndUpdate({_id: new ObjectID('5c4fdbf90d3a820cb7c4fb24')},{$set:{
//         text: 'Eat dinner'
//     }},{
//         returnOriginal: false
//     })

//     console.log(result);

// }catch(err){
//     console.log(err);
// }
    try{
        const result = await db.collection('Users')
        .findOneAndUpdate({_id: new ObjectID('5c4fd524ae65350cb7ac6afe')}
        ,{$set: {name:'Maria'},$inc:{age:1}}
        ,{returnOriginal: false});
        console.log(result);
    }catch(err){
        console.log(err);
    }



client.close();
})
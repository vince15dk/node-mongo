const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');

//mongoose.Promise = global.Promise; for lower than version 6

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose}
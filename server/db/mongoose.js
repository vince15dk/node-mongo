const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');

//mongoose.Promise = global.Promise; for lower than version 6

mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose}
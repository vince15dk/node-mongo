const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');

//mongoose.Promise = global.Promise; for lower than version 6

mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose}


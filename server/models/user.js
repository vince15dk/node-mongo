const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        trim: true,
        required: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password:{
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [
        {access: {
            type: String,
            required: true
        },
    token: {
        type: String,
        required: true
    }}
    ]
});

UserSchema.methods.toJSON = function(){ //this method is to sort what value we need when returning json value from mongoose
    const user = this;
    const userObject = user.toObject();

    return _.pick(userObject,["_id", "email"]);
};


UserSchema.methods.generateAuthToken = function(){ 
    // this non-arrow function allows you to 
    // reach the this keyword to bind with individual object which calls this method
    const user = this; 
    const access = 'auth';
    const token = jwt.sign({_id: user._id.toHexString(). access},'sj123').toString();

    //user.tokens.push({access, token});  Crashing issues with newer version of mongodb
    user.tokens = user.tokens.concat([{access, token}]);

    // return this method is to use then(prmoise) chaning method from the returning token value 
    // to use the token value in other scope(server.js side) which calls this method to

    // *** exmaple
    // return user.save().then(()=>{
    //     return token;
    // }).then((token)=>{  <-- for this chaning method to use this returning token value
    // })

    return user.save().then(()=>{ 
        return token;
    })

    
}

const User = mongoose.model('Users', UserSchema);

module.exports = {User}
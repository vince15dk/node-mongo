const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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
    const token = jwt.sign({_id: user._id.toHexString(), access},process.env.JWT_SECRET).toString();

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

UserSchema.methods.removeToken = function (token){ //Instance method
    const user = this;

    return user.update({
        $pull:{  // if token matches with the arguemnt property, it will pull (remove) the token value
            tokens: {
                token
            }
        }
    })
}



UserSchema.statics.findByToken = function(token) { //statics is same as methods but it turn it into Model method not instance method like methods

    const User = this;
    let decoded;

   try{
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
   }catch(err){
    // return new Promise((resolve, reject)=>{
    //     reject();
    // })
    return Promise.reject('Unautorized');
   }

   return User.findOne({ // return this chanining of returning user instance to other scope that calls this statics
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
   });

}

UserSchema.statics.findByCredentails = function (email, password) {
    const User = this;

   return User.findOne({email}).then((user)=>{
       if(!user){
           return Promise.reject();
       }

       return new Promise((resolve, reject)=>{
           bcrypt.compare(password, user.password,(err, res)=>{
               if(res){resolve(user)}
               else{
                   reject();
               };
           })
       })


   })
}


UserSchema.pre('save', function(next){
    const user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(10,(err, salt)=>{
            bcrypt.hash(user.password, salt, (err, hash)=>{
                user.password = hash;
                next();
            })
        })
       
    }else{
        next();
    }
})

const User = mongoose.model('Users', UserSchema);

module.exports = {User}
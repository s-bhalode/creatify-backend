const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    tokens : [
        {
            token : {
                type : String,
                required : true
            }
        }
    ]
})

// password hashing
userSchema.pre('save', async function (next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})

// generate Auth Token
userSchema.methods.generateAuthToken = async function (){
    try{
        let token = jwt.sign({ _id : this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token : token });
        await this.save();
        return token;


    }catch(err){
        console.log(err);
    }

}


const User = mongoose.model('USER', userSchema);

module.exports = User;




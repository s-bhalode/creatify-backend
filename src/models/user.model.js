const mongoose = require('mongoose');

const User = mongoose.model(
    "User",
    new mongoose.Schema({
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
        role : {
            type : String,
            required : true
        },
        bio : {
            type : String
        },
        skills : {
            type : String
        },
        portfolio_url : {
            type : String
        }
    })
);

module.exports = User;
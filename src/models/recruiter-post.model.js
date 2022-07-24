const mongoose = require('mongoose');

const RecruiterPostGallerySchema = mongoose.model(
    "RecruiterPostGallerySchema",
    new mongoose.Schema({
        companyName : {
            type : String,
            required : true
        },
        profileDesignation : {
            type : String,
            required : true
        },
        jobType : {
            type : String,
            required : true
        },
        location : {
            type : String,
            required : true
        },
        skillsRequirement : {
            type : String,
            required : true
        },
        postImageUrl : {
            type : String,
        },
        uploaded : {
            type : Date,
            default : Date.now
        }

    })
);

module.exports = RecruiterPostGallerySchema;
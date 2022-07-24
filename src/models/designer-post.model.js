const mongoose = require('mongoose');

const DesignerPost = mongoose.model(
    "DesignerPost",
    new mongoose.Schema({
        caption : {
            type : String
        },
        postImageUrl : {
            type : String,
            required : true
        },
        cloudinaryId : {
            type : String
        }
    })
);

module.exports = DesignerPost;
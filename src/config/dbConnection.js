const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path : './config.env'});

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then( () => {
    console.log(`connection successful`);
    // initial();
}).catch( (err) => {
    console.log(err);
    process.exit();
})

module.exports = {
     url : process.env.MONGO_URL ,
     database : "Creatify",
     imgBucket : "photos"
}

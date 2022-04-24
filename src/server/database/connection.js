const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path : './config.env'});

// console.warn(process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then( () => {
    console.log(`connection successful`);
}).catch( (err) => {
    console.log(err);
})
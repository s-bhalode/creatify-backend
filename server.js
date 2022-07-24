const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const mongoClient = require('mongodb').mongoClient;
const app = express();

dotenv.config({path : './config.env'});
const PORT = process.env.PORT;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

require('./src/config/dbConnection');
require('./src/config/cloudinary');

app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-type, Accept"
        );
        next();
});

var corsOptions = {
    origin : "http://localhost:3000"
};

//routes
require("./src/routes/auth.routes")(app);
require("./src/routes/user.routes")(app);

// const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
})


module.exports = app;




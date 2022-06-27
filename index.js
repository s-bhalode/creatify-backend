const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
app.use(express.json());
//require('./src/server/database/connection');

dotenv.config({path : './config.env'});
const PORT = process.env.PORT;


// routing files
app.use(require ('./src/server/routes/route'));

app.listen(PORT, () => {
    console.log(`server is running at port no. ${PORT}`)
});

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose')

const studentsRoute = require('./routes/students');
const degreesRoute = require('./routes/degree');
const userRoute = require('./routes/user');

dotenv.config();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'))
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", 'PUT, PATCH, POST, GET, DELETE');
        return res.status(200).json({});
    }
    next();
})

mongoose.connect('mongodb://127.0.0.1:27017/db',{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Successfully connected to MongoDB!');
})
.catch((error) => {
  console.log('Unable to connect to MongoDB!');
  console.error(error);
});

app.use('/students',studentsRoute);
app.use('/degrees',degreesRoute);
app.use('/user',userRoute);


app.use((req,res,next)=>{
    const error = new Error('Page not found!');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});
module.exports = app;
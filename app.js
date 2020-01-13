//imports express framework packages
var exp = require('express');

//import body-parser
var parse = require('body-parser');

//constant app function that executes express
var app = exp();

//import mongoose
var mongo = require('mongoose');

//imports morgan package for logging data
var morg = require('morgan'); 

//import sensor routes
var routeSensor = require('./api/routes/sensors'); 

// connect to mongoDB server
mongo.connect('mongodb+srv://node-api:r3stfulapi@node-api-4svbs.mongodb.net/test?retryWrites=true',
	{ useNewUrlParser: true }
);


app.use(morg('dev')); //provides logging in console

//parses body of incoming requests
app.use(parse.json()); 


//routes that handles requests, returns json file if true
app.use('/sensors', routeSensor);


//method to handle errors and sends back a message
app.use((req, res) => {
	var err = new Error('Sensor not located');
	err.status = 404; //404-not found
	next(err);//passes err to other source files
});




//object to expose source file
module.exports = app; 

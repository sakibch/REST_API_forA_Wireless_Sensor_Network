
//import mongoose
var mongo = require('mongoose');

var morg = require('morgan'); 

var parse = require('body-parser');

//schema for sensor
var senSchema = mongo.Schema({
	_id: mongo.Schema.Types.ObjectId,
	name: String,
	voltage: Number,
	watt: Number,
	costperHour: Number,
	costperDay: Number,
	costperMonth: Number,
});

//converts sensorSchema into a model
//passes Sensor variable to other source files
module.exports = mongo.model('Sensor', senSchema);

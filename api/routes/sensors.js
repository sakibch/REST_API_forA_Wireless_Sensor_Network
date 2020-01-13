//import Express framework
var exp = require('express'); 

var morg = require('morgan'); 

var parse = require('body-parser');

//handles routes for reaching endpoints
var finder = exp.Router(); 

//imports mongoose
var mongo = require('mongoose');

//import Sensors schema
var Sensor = require('../models/sensor');


//method to POST sensor data
finder.post('/', (req, res) => {
	var sensor = new Sensor ({
		_id: new mongo.Types.ObjectId(),
		name: req.body.name,
		voltage: req.body.voltage,
		watt: req.body.watt,
		costperHour: req.body.costperHour,
		costperDay: req.body.costperDay,
		costperMonth: req.body.costperMonth
	});
	sensor.save()
	.then(output => {
		console.log(output);
		res.json({
		message: 'Sensor created',
		createdSensor: {                //maps objects to new results
			name: output.name,
			voltage: output.voltage,
			watt: output.watt,
			costperHour: output.costperHour,
			costperDay: output.costperDay,
			costperMonth: output.costperMonth,
			_id: output._id,
		}
	});
	})
	.catch(err => console.log(err));
	
}); 



//GET method to receive sensors given parameters
finder.get('/', (req, res) => {
	Sensor.find()
	.select('name voltage watt costperHour costperDay costperMonth')
	.exec().then(output => {
		var reply = {
			sensors: output.map (outputs => {  //map into new array
				return {                
					name: outputs.name,
					voltage: outputs.voltage,
					watt: outputs.watt,
					costperHour: outputs.costperHour,
					costperDay: outputs.costperDay,
					costperMonth: outputs.costperMonth,
					_id: outputs._id
				}
			})
		};
		res.json(reply);
	})
	.catch(err => console.log(err));
});  

//return sensor for specific ID
finder.get('/:sensorId', (req, res) => {
  var id = req.params.sensorId;
  Sensor.findById(id)
    .select('name voltage watt costperHour costperDay costperMonth')
    .exec()
    .then(output => {
      if (output) {
        res.json(output);
      } else 
      {
        res.json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => console.log(err));    
});

//get sensor by name
finder.get('/', (req, res) => {
  var name = req.params.name;
  Sensor.find(name)
    .select('name voltage watt costperHour costperDay costperMonth')
    .exec()
    .then(output => {
      if (output) {
        res.json(output);
      } else {
        res.json({ message: "No valid entry found for provided name" });
      }
    })
    .catch(err => console.log(err));    
});




//method to update a given sensor data variable
finder.patch("/:sensorId", (req, res) => {
	var id = req.params.sensorId;
	var amend = {};
	for (var op of req.body) { //for each name, update name
		amend[op.newName] = op.val;
	}
	Sensors.update({_id: id}, 
	{ $set: amend }) //updates variable
	.exec()
	.then(output => {
		message: "Updated sensor successfully";
	})
	.catch(err => console.log(err));
});  


//method to delete sensor data by ID
finder.delete("/:sensorId", (req, res) => {
	var id = req.params.sensorId;
	Sensor.remove({_id: id})
	.exec()
	.then(output => {
		res.json({ message: 'Sensor removed from database' })
	})
	.catch(err => console.log(err));
});  


//removes all sensors from database
finder.delete("/", (req, res) => {
	Sensor.remove()
	.exec()
	.then(output => {
		res.json({ message: 'Sensor removed from database' })
	})
	.catch(err => console.log(err));
});  


module.exports = finder;
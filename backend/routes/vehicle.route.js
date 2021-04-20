const express = require('express');
const vehicleRoute = express.Router();

let Vehicle = require('../models/vehicle');

vehicleRoute.route('/vehicleAdd').post(function (req, res) {
    let vehicle = new Vehicle(req.body);
    vehicle.save().then(vehicle => {
        res.status(200).json({'vehicle': 'vehicle in added successfully'});
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
});


vehicleRoute.route('/getVehicle').get(function (req, res) {
  Vehicle.find(function (err, vehicle){
    if(err){
      console.log(err);
    }
    else {
      res.json(vehicle);
    }
  });
});

vehicleRoute.route('/vehicleDelete').post(function (req, res) {
  Vehicle.findByIdAndRemove({_id: req.body._id}, function(err, vehicle){
    if(err) res.status(400).send("Unable to delete");
    else res.status(200).send("Success");
  });
  
});


vehicleRoute.route('/vehicleUpdate').post(function (req, res) {
  Vehicle.findByIdAndUpdate({_id: req.body._id},req.body.vehicle, function(err,result){
    if(err) res.status(400).send("Update failed");
    else res.status(200).send("Success");
  });
 
});

module.exports = vehicleRoute;
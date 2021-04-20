const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

let Vehicle = new Schema({
  make: {
    type: String
  },
  model:{
    type: String
  },
  number_plate: {
    unique: true,
    type: String
  },
  
  id: {
    type: Number
  },
  
  color: {
    type:String 
  },

  date: {
      type:String
  },
  horsepower: {
      type: Number
  }
},{
  collection: 'Vehicles'
});

Vehicle.plugin(autoIncrement.plugin, {
  model: 'Vehicle',
  field: 'id',
  startAt: 1,
  incrementBy: 1
});

module.exports = mongoose.model('Vehicle', Vehicle);
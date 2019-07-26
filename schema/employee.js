//import mongoose from "mongoose";
var mongoose = require("mongoose")
, Schema = mongoose.Schema;


const employeeSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    address: String,
    salary : Number
});


// We are using employee collection inside 
var employeeModel = mongoose.model("employee", employeeSchema);

module.exports = employeeModel;


/*
var RegistrationSchema = new Schema({
    name:{ type: String, default: '', trim: false}
});

var Registration = mongoose.model('Registration', RegistrationSchema);
var New_Registration = mongoose.model('New_Registration', RegistrationSchema);

var registration = new Registration(data);
registration.save();

var new_registration = new New_Registration(data);
new_registration.save();
*/
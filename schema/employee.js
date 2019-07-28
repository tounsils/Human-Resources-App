var mongoose = require("mongoose")
, Schema = mongoose.Schema;


const employeeSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    address: String,
    salary : Number
});

// We are using appemployees collection inside 
var EmployeeModel = mongoose.model("appemployees", employeeSchema);

module.exports = EmployeeModel;
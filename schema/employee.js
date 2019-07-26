var mongooseEmployee = require("mongoose")
, Schema = mongooseEmployee.Schema;


const employeeSchema = new Schema({
    _id: mongooseEmployee.Schema.Types.ObjectId,
    name: String,
    address: String,
    salary : Number
});

// We are using employee collection inside 
var employeeModel = mongooseEmployee.model("appemployees", employeeSchema);

module.exports = employeeModel;
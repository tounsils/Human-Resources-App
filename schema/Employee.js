var mongoose = require("mongoose")
, Schema = mongoose.Schema;


const employeeSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    address: String,
    email: String,
    phone: String,
    jobtitle : String,
    image:
        {
            data: Buffer,
            contentType: String
        }
});

// We are using appemployees collection inside 
var EmployeeModel = mongoose.model("appemployees", employeeSchema);

module.exports = EmployeeModel;
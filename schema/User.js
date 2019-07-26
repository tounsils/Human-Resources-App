var mongoose = require("mongoose")
, Schema = mongoose.Schema;


const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    address: String,
    salary : Number
});

// We are using appusers collection inside 
var UserModel = mongoose.model("appusers", userSchema);

module.exports = UserModel;
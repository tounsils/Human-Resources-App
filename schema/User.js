var mongoose = require("mongoose")
, Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// _id, name, email, password, acl
const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: {
        type: String,
        minlength: 6,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    acl: {
        type: String,
        required: true,
        trim: true
    }
    
});


// Hash password when add/update user
userSchema.pre( 'save', async function( next ) {
    var user = this;    

    if ( user.isModified( 'password' ) ) {        
        user.password = await bcrypt.hash( user.password, 8 );
    }

    next();
} );

var UserModel = mongoose.model("appusers", userSchema);

module.exports = UserModel;


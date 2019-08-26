var express = require("express");
var User = require("../schema/User");
var mongoose = require("mongoose");

const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );

const router = express.Router();
const { body } = require('express-validator');
const { sanitizeBody } = require('express-validator');
const { validationResult } = require('express-validator');

// Login page
router.get( '/login', async ( req, res ) => {
    res.render( 'login' );  
} );

// Checking user login's information
router.post( '/login', async ( req, res ) => {
    // Find user by email
    var user = await User.findOne( { email: req.body.email } );

    // Check if user is not existed
    if ( ! user ) {
        return res.send( { errorMessage: 'Email ' + user + 'does not exist' } );
    }

    // Check if password is matched
    var isMatch = await bcrypt.compare( req.body.password, user.password );

    if ( ! isMatch ) {
        return res.send( { errorMessage: 'Password is invalid' } );
    }

    // Create JWT
    var token = await jwt.sign( { 
        _id: user._id.toString(),
        email: user.email,
        name: user.name
    }, 'my-token-key' );

    // Save JWT to cookie
    res.cookie( 'my-token', token, { maxAge: 36000000, httpOnly: true } );  // 10 hours

    // Send destinated url to client
    res.send( { url: 'http://localhost:6002' } );
} );

router.get('/logout', function(req, res){
    cookie = req.cookies;
    for (var prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
            continue;
        }    
        res.cookie(prop, '', {expires: new Date(0)});
    }
    res.redirect('/login');
});


router.get("/users", (req, res, next) => {
    res.status(200).json({
        message:"Serving Users on the Endpoint."
    });   
});

router.get("/list", (req, res, next) => {
    User.find({})
        .exec()
        .then(docs => {
            res.status(200).json({
                docs
            });
        })
        .catch(err => {
            console.log(err)
        });
});
//    var user = await User.findOne( { email: req.body.email } );

router.post("/findOne", (req, res, next) => {
    const rid = req.body.id;
    //console.log('route/findOne');
    console.log(rid);
    User.findById(rid)
        .exec()
        .then(docs => {
            res.status(200).json({
                docs
            });
        })
        .catch(err => {
            console.log(err)
        });
});


// _id, name, email, password, acl

router.post("/add", [
    body('email')
      .isEmail()
      .normalizeEmail(),
    body('acl')
      .not().isEmpty()
      .trim()
      .escape(),
    sanitizeBody('notifyOnReply').toBoolean()
  ], 
  (req, res, next) => {



    const user = new User({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        email:req.body.email,
        password: req.body.password,
        acl: req.body.acl
    });

    

    user.save()
    .then(result => {
        res.status(200).json({
            docs:[user]
        });
    })
    .catch(err => {
        console.log(err);
        //const errors = myValidationResult(req).array();
        alert(err);


    });
});

const myValidationResult = validationResult.withDefaults({
    formatter: (error) => {
      return {
        myLocation: error.location,
      };
    }
  });
  

router.post("/delete", (req, res, next) => {
    const rid = req.body.id;

    User.findById(rid)
        .exec()
        .then(docs => {
            docs.remove();
            res.status(200).json({
                deleted:true
            });
        })
        .catch(err => {
            console.log(err)
        });
});

/*
// to create test user, just use the following code :
var user = new User( {
    _id: mongoose.Types.ObjectId(),
    name: 'any.name',
email: 'any.email',
    password: 'any.password',
    acl: 'any.acl'
} );

user.save();
*/

module.exports = router;


var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");
var db = require("./config/database");
var hb = require("./config/handlebars");

const mongoose = require( 'mongoose' );
const path = require( 'path' );
const cookie = require( 'cookie-parser' );
const jwt = require( 'jsonwebtoken' );

var employees = require("./routes/employees");
var users = require("./routes/users");
//var login = require("./routes/login");

const app = express();

//set template engine hbs
app.engine("hbs", hb);
app.set("view engine","hbs");
// By default, hbs templates are located in Views folder, we use Templates folder instead, that's why we need this line
//app.set( 'views', path.join( __dirname, 'views' ) );
// Set location for statis resources
//app.use( express.static( path.join( __dirname, 'views\static\js' ) ) );

// Able to read req.body in JSON format
app.use( express.json() ); // is this necessary ?

// Able to use cookie
app.use( cookie() );

//make way for some custom css, js and images
app.use('/custom/css', express.static(__dirname + '/views/static/css'));
app.use('/custom/js', express.static(__dirname + '/views/static/js'));
app.use('/custom/imgs', express.static(__dirname + '/views/static/imgs'));

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

// Middleware Authentication 
app.use( ( req, res, next ) => {
    //console.log(req.cookies.hasOwnProperty.bind(queryData)('session'));

    //router.post('/', function(req, res, next) {
        req.cookies = JSON.parse(JSON.stringify(req.cookies));
        //console.log(req.cookies.hasOwnProperty('my-token'));
     // });
      

    // Check if it's not login page and my-token cookie is not existed > redirect to login page
    if ( '/login' !== req.path && ! req.cookies.hasOwnProperty( 'my-token' ) ) {
        //if ( 0 ) {
                return res.redirect( 'http://localhost:6002/login' );
    }
    // Check if it's login page and my-token is existed > redirect to home page
    else if ( '/login' === req.path && req.cookies.hasOwnProperty( 'my-token' ) ) {
    //else if ( 1 ) {
            return res.redirect( 'http://localhost:6002/' );
    }

    next();
} );
// 
//Home 
app.get('/', (req, res) => {
     var decoded = jwt.verify( req.cookies['my-token'], 'my-token-key' );

    res.render( 'home', {
        name: decoded.email
    } );
   
    //res.render('home');
   
} );

//about 
app.get('/about', (req, res) => {
    var decoded = jwt.verify( req.cookies['my-token'], 'my-token-key' );

    res.render( 'about', {
        name: decoded.email
    } );
});

//about 
app.get('/contact', (req, res) => {
    var decoded = jwt.verify( req.cookies['my-token'], 'my-token-key' );

    res.render( 'contact', {
        name: decoded.email
    } );
});

app.use("/users", users);
//Home users route
app.get('/users', (req, res) => {
    var decoded = jwt.verify( req.cookies['my-token'], 'my-token-key' );

    res.render( 'users', {
        name: decoded.email
    } );
});

app.use("/employees", employees);
//employees route
app.get('/employees', (req, res) => {
    var decoded = jwt.verify( req.cookies['my-token'], 'my-token-key' );

    res.render( 'employees', {
        name: decoded.email
    } );
});
app.use( users);

module.exports = app;
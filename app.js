var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");
var db = require("./config/database");
var hb = require("./config/handlebars");

var employees = require("./routes/employees");
var users = require("./routes/users");

const app = express();

//set template engine
app.engine("hbs", hb);
app.set("view engine","hbs");

//make way for some custom css, js and images
app.use('/custom/css', express.static(__dirname + '/views/static/css'));
app.use('/custom/js', express.static(__dirname + '/views/static/js'));
app.use('/custom/imgs', express.static(__dirname + '/views/static/imgs'));

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

//Home 
app.get('/', (req, res) => {
    res.render('home');
});

//about 
app.get('/about', (req, res) => {
    res.render('about');
});

//about 
app.get('/contact', (req, res) => {
    res.render('contact');
});


app.use("/users", users);
//Home users route
app.get('/users', (req, res) => {
    res.render('users');
});

app.use("/employees", employees);
//employees route
app.get('/employees', (req, res) => {
    res.render('employees');
});

module.exports = app;
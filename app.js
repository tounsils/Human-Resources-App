var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");
var db = require("./config/database");
var hb = require("./config/handlebars");

var users = require("./routes/users");
var employee = require("./routes/employee");

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

app.use("/users", users);
//Home route
app.get('/users', (req, res) => {
    res.render('home');
});

app.use("/employee", employee);
//employee route
app.get('/employee', (req, res) => {
    res.render('employee');
});

module.exports = app;
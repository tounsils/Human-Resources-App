var express = require("express");
var Employee = require("../schema/Employee");
var mongoose = require("mongoose");
var csv      = require('csv-express');
var fs = require('fs'); //Added for file upload
var multer = require('multer'); //Added for file upload
require('dotenv/config'); //Added for file upload
const path = require( 'path' );

const router = express.Router();

router.get("/employees", (req, res, next) => {
    res.status(200).json({
        message:"Serving Employees on the Endpoint."
    });   
});

router.get('/exportemployeestocsv', function(req, res, next) {
    var filename   = "employees.csv";
    var dataArray;
    Employee.find().lean().exec({}, function(err, employees) {
        if (err) res.send(err);
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader("Content-Disposition", 'attachment; filename='+filename);
        res.csv(employees, true);
    });
 });
module.exports = router;


router.get("/list", (req, res, next) => {
    Employee.find({})
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

router.post("/findOne", (req, res, next) => {
    const rid = req.body.id;
    //console.log('route/findOne');
    //console.log(rid);
    Employee.findById(rid)
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


router.post("/add", (req, res, next) => {

    const employee = new Employee({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        address:req.body.address,
        email:req.body.email,
        phone:req.body.phone,
        jobtitle: req.body.jobtitle,
        img: req.body.img
    });

    employee.save()
    .then(result => {
        res.status(200).json({
            docs:[employee]
        });
    })
    .catch(err => {
        console.log(err);
    });
});

router.post("/delete", (req, res, next) => {
    const rid = req.body.id;

    Employee.findById(rid)
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

router.post('/update', (req, res, next) => {
    const rid = req.body.id;

    const Newemployee = new Employee({
        name: req.body.name,
        address:req.body.address,
        email:req.body.email,
        phone:req.body.phone,
        jobtitle: req.body.jobtitle,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    });
    //console.log(Newemployee);


  Employee.findOneAndUpdate({_id: rid}, Newemployee, {useFindAndModify: false}).then(
      () => {
        res.status(201).json({
          message: 'employee updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });    

module.exports = router;
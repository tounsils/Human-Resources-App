var express = require("express");
var Employee = require("../schema/Employee");
var mongoose = require("mongoose");

const router = express.Router();

router.get("/employees", (req, res, next) => {
    res.status(200).json({
        message:"Serving Employees on the Endpoint."
    });   
});

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
        salary: req.body.salary
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
        salary: req.body.salary
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
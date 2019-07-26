var express = require("express");
var employee = require("../schema/employee");
var mongooseEmployee = require("mongoose");

const router = express.Router();

router.get("/employee", (req, res, next) => {
    res.status(200).json({
        message:"Serving employees on the Endpoint."
    });   
});

router.get("/list", (req, res, next) => {
    employee.find({})
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

    const employee = new employee({
        _id: mongooseEmployee.Types.ObjectId(),
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

    employee.findById(rid)
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

module.exports = router;
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

router.post("/findone", (req, res, next) => {
    const rid = req.body.id;
    //console.log('route/findone');
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

// Update a record with id
router.put("/update", (req, res, next) => {
    const rid = req.body.id;
    //console.log($("#update_Name"));
/*
        // Validate Request
        if(!req.body.content) {
            return res.status(400).send({
                message: "Employee content can not be empty"
            });
        }
    
        // Find Employee and update it with the request body
        Employee.findByIdAndUpdate(req.body.id, {
            name: $("#update_Name") || "Untitled Note",
            content: req.body.content
        }, {new: true})
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send(note);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });                
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.noteId
            });
        });
    
*/

});

/*
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};

*/

module.exports = router;
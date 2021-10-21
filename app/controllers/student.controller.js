const db = require("../models");
const Student = db.students;
const Op = db.Sequelize.Op;

// Create and Save a new Student
exports.create = (req, res) => {
    // Validate request
    if (!req.body.fName) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Student
    const student = {
      studentID: req.body.studentID,
      advisorID: req.body.advisorID,
      degreeID: req.body.degreeID,
      fName: req.body.fName,
      lName: req.body.lName,
      major: req.body.major,
      grad_date: req.body.grad_date,
      email: req.body.email,
      createAt: db.Sequelize.NOW,
      updatedAt: db.Sequelize.NOW

   
    };
  
    // Save Student in the database
    Student.create(student)
      .then(data => {
        console.log(data)
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Student."
        });
      });
  }

// Retrieve all Students from the database.
exports.findAll = (req, res) => {
    const id = req.params.id;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  
    Student.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Students."
        });
      });
  };


// Find a single Student with an id
exports.findOne = (req, res) => {
  console.log("getting here")
    const id = req.params.id;
    console.log(id);
  Student.findByPk(id /*,{include: ["degree", "advisor"]}*/) //this will return the degrees and advisors for that given student
    .then(data => {
      res.send(data);
      console.log(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Student with id=" + id
      });
    });
};


// Update a Student by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Student.update(req.body, { updatedAt: db.Sequelize.NOW,
      where: { studentID: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Student was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Student with id=${id}. Maybe Student was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Student with id=" + id
        });
      });
  };

// Delete a Student with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Student.destroy({
      where: { studentID: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Student was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Student with id=${id}. Maybe Student was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Student with id=" + id
        });
      });
  };

// Delete all Students from the database.
exports.deleteAll = (req, res) => {
    Student.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Students were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Students."
        });
      });
  };

// Find all published Students
exports.findAllPublished = (req, res) => {
    Student.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Students."
        });
      });
  };

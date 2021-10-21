//const { response } = require("express");
const db = require("../models");
const Course = db.courses;
const Op = db.Sequelize.Op;

// Create and Save a new Course
exports.create = (req, res) => {
    // Validate request
    
  
    // Create a Course
    const course = {
      courseID: req.body.courseID,
      semesterID: req.body.semesterID,
      name: req.body.name,
      dept: req.body.dept,
      courseNum: req.body.courseNum,
      desc: req.body.desc,
      hours: req.body.hours,
      level: req.body.level,
      //createdAt: db.Sequelize.NOW,
      //updatedAt: db.Sequelize.NOW,
    
    };
  
    // Save Course in the database
    Course.create(course)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Course."
        });
      });
  }

// Retrieve all Courses from the database.
exports.findAll = (req, res) => {
    const id = req.params.id;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  
    Course.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Courses."
        });
      });
  };


// Find a single Course with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

  Course.findByPk(id)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Course with id=" + id
      });
    });
};


// Update a Course by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
   
  
    Course.update(req.body, { updatedAt: db.Sequelize.NOW,
      where: { courseID: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Course was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Course with id=${id}. Maybe Course was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Course with id=" + id
        });
      });
  };

// Delete a Course with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    console.log(id);
  
    Course.destroy({
      where: { courseID: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Course was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Course with id=${id}. Maybe Course was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Course with id=" + id
        });
      });
  };

// Delete all Courses from the database.
exports.deleteAll = (req, res) => {
    Course.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Courses were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Courses."
        });
      });
  };

// Find all published Courses
exports.findAllPublished = (req, res) => {
    Course.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Courses."
        });
      });
  };

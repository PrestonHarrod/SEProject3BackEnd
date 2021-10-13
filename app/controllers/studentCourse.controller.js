const db = require("../models");
const StudentCourses = db.studentCourses;
const Op = db.Sequelize.Op;

// Create and Save a new degree
exports.create = (req, res) => {
    // Validate request
    if (!req.body.id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Degree
    const studentCourse = {
      id: req.body.id,
      studentID: req.body.studentID,     
      courseID: req.body.id
   
    };
  
    // Save degree in the database
    StudentCourses.create(studentCourse)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Degree."
        });
      });
  }

// Retrieve all Degrees from the database.
exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  
    Degree.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Degrees."
        });
      });
  };


// Find a single Degree with an id
exports.findOne = (req, res) => {
  const id = req.query.id;

  Degree.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Degree with id=" + id
      });
    });
};


// Update a Degree by the id in the request
exports.update = (req, res) => {
    const id = req.query.id;
  
    Degree.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "degree was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update degree with id=${id}. Maybe degree was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating degree with id=" + id
        });
      });
  };

// Delete a degree with the specified id in the request
exports.delete = (req, res) => {
    const id = req.query.id;
  
    Degree.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "degree was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete degree with id=${id}. Maybe degree was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete degree with id=" + id
        });
      });
  };

// Delete all degrees from the database.
exports.deleteAll = (req, res) => {
    Degree.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} degrees were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all degrees."
        });
      });
  };

// Find all published degrees
exports.findAllPublished = (req, res) => {
    Degree.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving degrees."
        });
      });
  };
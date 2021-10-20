const db = require("../models");
const Semester = db.semesters;
const Op = db.Sequelize.Op;

// Create and Save a new Semester
exports.create = (req, res) => {
    // Validate request
    if (!req.body.id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Semester
    const semester = {
      semesterID: req.body.semesterID,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      season: req.body.season
   
    };
  
    // Save Semester in the database
    Semester.create(semester)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Semester."
        });
      });
  }

// Retrieve all Semesters from the database.
exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  
    Semester.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Semesters."
        });
      });
  };


// Find a single Semester with an id
exports.findOne = (req, res) => {
    const id = req.query.id;

  Semester.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Semester with id=" + id
      });
    });
};


// Update a Semester by the id in the request
exports.update = (req, res) => {
    const id = req.query.id;
  
    Semester.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Semester was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Semester with id=${id}. Maybe Semester was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Semester with id=" + id
        });
      });
  };

// Delete a Semester with the specified id in the request
exports.delete = (req, res) => {
    const id = req.query.id;
  
    Semester.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Semester was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Semester with id=${id}. Maybe Semester was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Semester with id=" + id
        });
      });
  };

// Delete all Semesters from the database.
exports.deleteAll = (req, res) => {
    Semester.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Semesters were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Semesters."
        });
      });
  };

// Find all published Semesters
exports.findAllPublished = (req, res) => {
    Semester.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Semesters."
        });
      });
  };
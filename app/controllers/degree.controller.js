const db = require("../models");
const degree = db.degrees;
const Op = db.Sequelize.Op;

// Create and Save a new degree
exports.create = (req, res) => {
    // Validate request
    if (!req.body.degreeID) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Degree
    const degree = {
      degreeID: req.body.degreeID,
      dept: req.body.dept,
      degree: req.body.degree,
      hours: req.body.hours
   
    };
  
    // Save degree in the database
    Degree.create(Degree)
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
    const degreeID = req.query.degreeID;
    var condition = degreeID ? { degreeID: { [Op.like]: `%${degreeID}%` } } : null;
  
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
    const degreeID = req.query.degreeID;

  Degree.findByPk(degreeID)
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
    const degreeID = req.query.degreeID;
  
    Degree.update(req.body, {
      where: { degreeID: degreeID }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "degree was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update degree with id=${degreeID}. Maybe degree was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating degree with id=" + degreeID
        });
      });
  };

// Delete a degree with the specified id in the request
exports.delete = (req, res) => {
    const degreeID = req.query.degreeID;
  
    Degree.destroy({
      where: { degreeID: degreeID }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "degree was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete degree with id=${degreeID}. Maybe degree was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete degree with id=" + degreeID
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
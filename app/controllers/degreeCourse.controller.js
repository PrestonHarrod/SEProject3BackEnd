const db = require("../models");
const DegreeCourses = db.degreeCourses;
const Op = db.Sequelize.Op;

// Create and Save a new degree
exports.create = (req, res) => {
    // Validate request
  
    // Create a Degree
    const degreeCourse = {
      id: req.body.id,
      degreeID: req.body.degreeID,     
      courseID: req.body.courseID
    };

    console.log(degreeCourse.id + " " + degreeCourse.degreeID + " " + degreeCourse.courseID);
  
    // Save degree in the database
    DegreeCourses.create(degreeCourse)
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
  var condition = degreeID ? {
    degreeID: {
      [Op.like]: `%${degreeID}%`
    }
  } : null;

  DegreeCourses.findAll({include: ["degree", "course"], where: condition})
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

    DegreeCourses.findByPk(id)
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
  
    DegreeCourses.update(req.body, {
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
    console.log("Rererererererererererere");
    const id = req.params.id;
    console.log(req.params.id + '!!!!!!!!!!!!!!!!!!')

    DegreeCourses.destroy({
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
  const degreeID = req.query.degreeID;
  DegreeCourses.destroy({
      where: {degreeID: degreeID},
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
  DegreeCourses.findAll({ where: { published: true } })
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

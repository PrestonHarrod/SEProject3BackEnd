const db = require("../models");
const Admin = db.admins;
const Op = db.Sequelize.Op;

// Create and Save a new Admin
exports.create = (req, res) => {
    // Validate request
    if (!req.body.adminID) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Admin
    const admin = {
      adminID: req.body.adminID,
      advisorID: req.body.advisorID,
      username: req.body.username,
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      dept: req.body.dept
    
   
    };
  
    // Save Admin in the database
    Admin.create(admin)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Admin."
        });
      });
  }

// Retrieve all Admins from the database.
exports.findAll = (req, res) => {
    const adminID = req.query.adminID;
    var condition = adminID ? { adminID: { [Op.like]: `%${adminID}%` } } : null;
  
    Admin.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Admins."
        });
      });
  };


// Find a single Admin with an id
exports.findOne = (req, res) => {
    const adminID = req.query.adminID;

  Admin.findByPk(adminID)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Admin with id=" + id
      });
    });
};


// Update a Admin by the id in the request
exports.update = (req, res) => {
    const adminID = req.query.adminID;
  
    Admin.update(req.body, {
      where: { adminID: adminID }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Admin was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Admin with id=${adminID}. Maybe Admin was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Admin with id=" + adminID
        });
      });
  };

// Delete a Admin with the specified id in the request
exports.delete = (req, res) => {
    const adminID = req.query.adminID;
  
    Admin.destroy({
      where: { adminID: adminID }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Admin was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Admin with id=${adminID}. Maybe Admin was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Admin with id=" + adminID
        });
      });
  };

// Delete all Admins from the database.
exports.deleteAll = (req, res) => {
    Admin.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Admins were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Admins."
        });
      });
  };

// Find all published Admins
exports.findAllPublished = (req, res) => {
    Admin.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Admins."
        });
      });
  };
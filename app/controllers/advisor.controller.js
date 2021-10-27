const db = require("../models");
const Advisor = db.advisors;
const Op = db.Sequelize.Op;

// Create and Save a new Advisor
exports.create = (req, res) => {
  console.log("create advisor start");
    // Validate request

    if (!req.body.dept) {

      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    
    // Create a Advisor
    const advisor = {
      advisorID: req.body.advisorID,
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      dept: req.body.dept,
      // createdAt: db.Sequelize.NOW,
      // updatedAt: db.Sequelize.NOW
    
   
    };
    
  
    // Save Advisor in the database
    Advisor.create(advisor)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Advisor."
        });
      });
  }

// Retrieve all Advisors from the database.
exports.findAll = (req, res) => {

    const id = req.params.id;

    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;
  
    Advisor.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Advisors."
        });
      });
  };


// Find a single Advisor with an id
exports.findOne = (req, res) => {

    const id = req.params.id;


  Advisor.findByPk(id /*, {include: ["advisor"]}*/)
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Advisor with id=" + id
      });
    });
};




// Update a Advisor by the id in the request
exports.update = (req, res) => {

    const id = req.params.id;

  
    Advisor.update(req.body, { updatedAt: db.Sequelize.NOW,
      where: { advisorID: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Advisor was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Advisor with id=${advisorID}. Maybe Advisor was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Advisor with id=" + advisorID
        });
      });
  };

// Delete a Advisor with the specified id in the request
exports.delete = (req, res) => {

    const id = req.params.id;

  
    Advisor.destroy({
      where: { advisorID: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Advisor was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Advisor with id=${advisorID}. Maybe Advisor was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Advisor with id=" + advisorID
        });
      });
  };

// Delete all Advisors from the database.
exports.deleteAll = (req, res) => {
    Advisor.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Advisors were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Advisors."
        });
      });
  };

// Find all published Advisors
exports.findAllPublished = (req, res) => {
    Advisor.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Advisors."
        });
      });
  };

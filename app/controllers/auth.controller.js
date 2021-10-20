const db = require("../models");
const Admin = db.admins;
const Op = db.Sequelize.Op;

// Log into the system
exports.create = (req, res) => {
    // Validate request
    if (!req.body.adminID) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Admin
    const session = {
      //session Details
    
   
    };
  
   
    Session.create(session)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the session."
        });
      });
  }

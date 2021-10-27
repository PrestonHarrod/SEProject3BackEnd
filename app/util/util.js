const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Admin = db.admins;
const Advisor = db.advisors;
const Student = db.students;


//Verify token?
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  Admin.findByPk(req.adminID).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

isAdvisor = (req, res, next) => {
    Advisor.findByPk(req.advisorID).then(user => {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "advisor") {
            next();
            return;
          }
        }
  
        res.status(403).send({
          message: "Require Advisor Role!"
        });
        return;
      });
    });
  };

  isAdvisor = (req, res, next) => {
    Advisor.findByPk(req.advisorID).then(user => {
      user.getRoles().then(roles => { //we dont have users?
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "advisor") {
            next();
            return;
          }
        }
  
        res.status(403).send({
          message: "Require Advisor Role!"
        });
        return;
      });
    });
  };

 


//checks to see if they are an advisor or an admin, how do I include each?
isAdminOrAdvisor = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};


//how do I check for any role?
isAny = (req, res, next) => {

  
};

const authJwt = {
  isAdmin: isAdmin,
  isAdvisor: this.isAdvisor,
  isStudent: isStudent,
  isAdminOrAdvisor: isAdminOrAdvisor,
  isAny: isAny
  
};
module.exports = authJwt;
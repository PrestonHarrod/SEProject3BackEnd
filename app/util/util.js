const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Admin = db.admins;
const Advisor = db.advisors;
const Student = db.students;

//authorization

//Verify token?

isAdmin = (req, res, next) => {

};

isAdvisor = (req, res, next) => {

  };



 


//checks to see if they are an advisor or an admin, how do I include each?
isAdminOrAdvisor = (req, res, next) => {

};


//how do I check for any role?
isAny = (req, res, next) => {

  
};

const authJwt = {
  authenticate: authenticate,
  isAdmin: isAdmin,
  isAdvisor: this.isAdvisor,
  isStudent: isStudent,
  isAdminOrAdvisor: isAdminOrAdvisor,
  isAny: isAny
  
};
module.exports = authJwt;
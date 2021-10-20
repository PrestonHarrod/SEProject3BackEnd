module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
  
    var router = require("express").Router();
  
    // Login as a new user
    router.post("/", auth.login);

    // Login as a new user
    router.post("/", auth.logout);
  
  
  };
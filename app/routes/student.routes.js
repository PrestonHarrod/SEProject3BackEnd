module.exports = app => {
    const students = require("../controllers/student.controller.js");
    const auth = require("../util.js");
    const auth = require("../util.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", [auth.authenticate, auth.isAdminOrAdvisor], students.create);
  
    // Retrieve all students
    router.get("/", [auth.authenticate, auth.isAny], students.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", [auth.authenticate, auth.isAdminOrAdvisor], students.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", [auth.authenticate, auth.isAny], students.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", [auth.authenticate, auth.isAdminOrAdvisor], students.delete);
  
    // Delete all students
    router.delete("/", [auth.authenticate, auth.isAdminOrAdvisor], students.deleteAll);
  
    app.use('/api/students', router);
  };
module.exports = app => {
    const semesters = require("../controllers/semester.controller.js");
    const auth = require("../util/util.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", [auth.authenticate, auth.isAdminOrAdvisor], semesters.create);
  
    // Retrieve all semesters
    router.get("/", [auth.authenticate, auth.isAny], semesters.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", [auth.authenticate, auth.isAdminOrAdvisor], semesters.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", [auth.authenticate, auth.isAdminOrAdvisor], semesters.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", [auth.authenticate, auth.isAdminOrAdvisor], semesters.delete);
  
    // Delete all semesters
    router.delete("/", [auth.authenticate, auth.isAdminOrAdvisor], semesters.deleteAll);
  
    app.use('/api/semesters', router);
  };
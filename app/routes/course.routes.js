module.exports = app => {
    const courses = require("../controllers/course.controller.js");
    const auth = require("../util/util.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", [auth.authenticate, auth.isAdminOrAdvisor], courses.create);
  
    // Retrieve all courses
    router.get("/", [auth.authenticate, auth.isAny], courses.findAll);
  
  
    // Retrieve a single Tutorial with id
    router.get("/:id", [auth.authenticate, auth.isAdminOrAdvisor], courses.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", [auth.authenticate, auth.isAdminOrAdvisor], courses.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", [auth.authenticate, auth.isAdminOrAdvisor], courses.delete);
  
    // Delete all courses
    router.delete("/", [auth.authenticate, auth.isAdminOrAdvisor], courses.deleteAll);
  
    app.use('/api/courses', router);
  };
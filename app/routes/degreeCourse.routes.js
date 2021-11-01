module.exports = app => {
    const degreeCourses = require("../controllers/degreeCourse.controller.js");
    const auth = require("../util.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", [auth.authenticate, auth.isAdminOrAdvisor], degreeCourses.create);
  
    // Retrieve all degreeCourses
    router.get("/", [auth.authenticate, auth.isAny], degreeCourses.findAll);
  
  
    // Retrieve a single Tutorial with id
    router.get("/:id", [auth.authenticate, auth.isAdminOrAdvisor], degreeCourses.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", [auth.authenticate, auth.isAdminOrAdvisor], degreeCourses.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", [auth.authenticate, auth.isAdminOrAdvisor], degreeCourses.delete);
  
    // Delete all degreeCourses
    router.delete("/", [auth.authenticate, auth.isAdminOrAdvisor], degreeCourses.deleteAll);
  
    app.use('/api/degreeCourses', router);
  };
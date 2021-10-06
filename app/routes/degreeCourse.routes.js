module.exports = app => {
    const degreeCourses = require("../controllers/degreeCourse.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", degreeCourses.create);
  
    // Retrieve all degreeCourses
    router.get("/", degreeCourses.findAll);
  
    // Retrieve all published degreeCourses
    router.get("/published", degreeCourses.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", degreeCourses.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", degreeCourses.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", degreeCourses.delete);
  
    // Delete all degreeCourses
    router.delete("/", degreeCourses.deleteAll);
  
    app.use('/api/degreeCourses', router);
  };
module.exports = app => {
    const studentCourses = require("../controllers/studentCourse.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", studentCourses.create);
  
    // Retrieve all studentCourses
    router.get("/", studentCourses.findAll);
  
    // Retrieve all published studentCourses
    router.get("/published", studentCourses.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", studentCourses.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", studentCourses.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", studentCourses.delete);
  
    // Delete all studentCourses
    router.delete("/", studentCourses.deleteAll);
  
    app.use('/api/studentCourses', router);
  };
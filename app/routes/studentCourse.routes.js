module.exports = app => {
    const studentCourses = require("../controllers/studentCourse.controller.js");
    const auth = require("../util.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", [auth.authenticate, auth.isAdminOrAdvisor], studentCourses.create);
  
    // Retrieve all studentCourses
    router.get("/", [auth.authenticate, auth.isAny], studentCourses.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", [auth.authenticate, auth.isAdminOrAdvisor], studentCourses.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", [auth.authenticate, auth.isAdminOrAdvisor], studentCourses.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", [auth.authenticate, auth.isAdminOrAdvisor], studentCourses.delete);
  
    // Delete all studentCourses
    router.delete("/", [auth.authenticate, auth.isAdminOrAdvisor], studentCourses.deleteAll);
  
    app.use('/api/studentCourses', router);
  };
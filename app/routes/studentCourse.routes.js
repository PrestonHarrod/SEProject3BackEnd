module.exports = app => {
    const studentCourses = require("../controllers/studentCourse.controller.js");
    const auth = require("../controllers/util.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", [auth.authenticate, auth.isAny], studentCourses.create);
  
    // Retrieve all studentCourses
    router.get("/", [auth.authenticate, auth.isAny], studentCourses.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", [auth.authenticate, auth.isAny], studentCourses.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", [auth.authenticate, auth.isAny], studentCourses.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", [auth.authenticate, auth.isAny], studentCourses.delete);
  
    // Delete all studentCourses
    router.delete("/", [auth.authenticate, auth.isAny], studentCourses.deleteAll);
  
    app.use('/api/studentCourses', router);
  };
module.exports = app => {
    const degrees = require("../controllers/degree.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", degrees.create);
  
    // Retrieve all degrees
    router.get("/", degrees.findAll);
  
    // Retrieve all published degrees
    router.get("/published", degrees.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", degrees.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", degrees.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", degrees.delete);
  
    // Delete all degrees
    router.delete("/", degrees.deleteAll);
  
    app.use('/api/degrees', router);
  };
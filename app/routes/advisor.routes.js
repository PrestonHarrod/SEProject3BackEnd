module.exports = app => {
    const advisors = require("../controllers/advisor.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", advisors.create);
  
    // Retrieve all advisors
    router.get("/", advisors.findAll);
  
    // Retrieve all published advisors
    router.get("/published", advisors.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", advisors.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", advisors.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", advisors.delete);
  
    // Delete all advisors
    router.delete("/", advisors.deleteAll);
  
    app.use('/api/advisors', router);
  };
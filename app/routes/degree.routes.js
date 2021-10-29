module.exports = app => {
    const degrees = require("../controllers/degree.controller.js");
    const auth = require("../util.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", [auth.authenticate, auth.isAdminOrAdvisor], degrees.create);
  
    // Retrieve all degrees
    router.get("/", [auth.authenticate, auth.isAny], degrees.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", [auth.authenticate, auth.isAdminOrAdvisor], degrees.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", [auth.authenticate, auth.isAdminOrAdvisor], degrees.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", [auth.authenticate, auth.isAdminOrAdvisor], degrees.delete);
  
    // Delete all degrees
    router.delete("/", [auth.authenticate, auth.isAdminOrAdvisor], degrees.deleteAll);
  
    app.use('/api/degrees', router);
  };
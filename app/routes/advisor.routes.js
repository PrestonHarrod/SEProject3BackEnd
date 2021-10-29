module.exports = app => {
    const advisors = require("../controllers/advisor.controller.js");
    const auth = require("../util.js");

    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", [auth.authenticate, auth.isAdmin], advisors.create);
  
    // Retrieve all advisors
    router.get("/", [auth.authenticate, auth.isAny], advisors.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", [auth.authenticate, auth.isAdmin], advisors.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", [auth.authenticate, auth.isAdmin], advisors.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", [auth.authenticate, auth.isAdmin], advisors.delete);
  
    // Delete all advisors
    router.delete("/", [auth.authenticate, auth.isAdmin], advisors.deleteAll);
  
    app.use('/api/advisors', router);
  };
module.exports = app => {
    const admins = require("../controllers/admin.controller.js");
    const auth = require("../util/util.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", admins.create);
  
    // Retrieve all admins
    router.get("/", [auth.authenticate, auth.isAdmin], admins.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", [auth.authenticate, auth.isAdmin], admins.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", [auth.authenticate, auth.isAdmin], admins.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", [auth.authenticate, auth.isAdmin], admins.delete);
  
    // Delete all admins
    router.delete("/", [auth.authenticate, auth.isAdmin], admins.deleteAll);
  
    app.use('/api/admins', router);
  };
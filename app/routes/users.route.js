module.exports = (app) => {
    const router = require("express").Router();
    const UserController = require("../controllers/users.controller");
  
    const { checkAuth } = require("./../middlewares");
  
    router
      .get("/",   UserController.getUsers)
      .post("/create", UserController.createUser)
      .put("/", UserController.updateUser)
      .delete("/", UserController.deleteUser);
    //checkAuth
  
    app.use("/api/users", router);
  };
  
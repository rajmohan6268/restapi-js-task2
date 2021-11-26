module.exports = (app) => {
  const router = require("express").Router();
  const UserController = require("../controllers/users.controller");

  const { checkAuth ,isAdmin } = require("./../middlewares");
  //isAdmin
  router
    .get("/",  UserController.getUsers)
    .get("/:id",  UserController.getusebyid)
    .post("/", UserController.createUser)
    .put("/:id",  UserController.updateUser)
    .delete("/:id",  UserController.deleteUser);

  app.use("/api/users", router);
};

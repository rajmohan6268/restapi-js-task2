module.exports = (app) => {
  const router = require("express").Router();
  const UserController = require("../controllers/users.controller");

  const { checkAuth } = require("./../middlewares");
  //isAdmin
  router
    .get("/", checkAuth, UserController.getUsers)
    .get("/:id", checkAuth, UserController.getusebyid)
    .post("/", UserController.createUser)
    .put("/:id", checkAuth, UserController.updateUser)
    .delete("/:id", checkAuth, UserController.deleteUser);

  app.use("/api/users", router);
};

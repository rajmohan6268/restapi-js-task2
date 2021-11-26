module.exports = (app) => {
  const router = require("express").Router();
  const UserController = require("../controllers/users.controller");

  const { checkAuth } = require("./../middlewares");

  router
    .get("/", UserController.getUsers)
    .get("/:id", UserController.getusebyid)
    .post("/create", UserController.createUser)
    .put("/:id", UserController.updateUser)
    .delete("/:id", UserController.deleteUser);

  app.use("/api/users", checkAuth, router);
};

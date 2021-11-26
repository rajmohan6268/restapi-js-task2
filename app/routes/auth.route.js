module.exports = (app) => {
  const router = require("express").Router();
  const authController = require("../controllers/auth.controller");
  router.post("/login", authController.login);

  app.use("/api/auth", router);
};

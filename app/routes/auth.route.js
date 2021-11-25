module.exports = (app) => {
  const router = require("express").Router();
  router.post("/register", (req, res) => {
    res.send("post Auth");
  });

  app.use("/api/auth", router);
};

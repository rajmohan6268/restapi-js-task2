module.exports = (app) => {
  const router = require("express").Router();
  const postController = require("../controllers/posts.controller");

  const { checkAuth } = require("./../middlewares");

  router
    .get("/",   postController.getPosts)
    .post("/create", postController.createPost)
    .put("/", postController.updatePost)
    .delete("/", postController.deletePost);

  //checkAuth

  app.use("/api/posts", router);
};

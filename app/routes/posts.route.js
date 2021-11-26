module.exports = (app) => {
  const router = require("express").Router();
  const postController = require("../controllers/posts.controller");

  const { checkAuth } = require("./../middlewares");

  router
    .get("/", postController.getPosts)
    .get("/:id", postController.getPostsbyId)
    .post("/", postController.createPost)
    .put("/:id", postController.updatePost)
    .delete("/:id", postController.deletePost);

  //checkAuth

  app.use("/api/posts", checkAuth, router);
};

module.exports = (app) => {
  const router = require("express").Router();
  const repliesController = require("../controllers/replies.controller.js");

  const { checkAuth } = require("../middlewares");

  router
    .get("/:id/replies", repliesController.getReplyByPostId)
    .post("/:id/replies", repliesController.createtReplyByPostId)
    .put("/:id/replies/:replyid", repliesController.updatetReplyByPostId)
    .delete("/:id/replies/:replyid", repliesController.deletetReplyByPostId);

  //checkAuth

  app.use("/api/posts", checkAuth, router);
};

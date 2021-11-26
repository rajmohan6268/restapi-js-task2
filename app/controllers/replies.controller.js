const { sendResponse } = require("../helpers");
const pool = require("../db");

exports.getReplyByPostId = async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const { userId } = req.user;

  try {
    const data = await pool.query(
      "SELECT * FROM replies WHERE repliedOn = ?",
      postId
    );
    if (data.length === 0) {
      return sendResponse(res, 404, [], " invalid userid or post id");
    }
    return sendResponse(res, 200, data[0], "replied on post");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return sendResponse(res, 500, [], "something went wrong");
  }
};

exports.createtReplyByPostId = async (req, res) => {
  // validate postId and repliesId
  req.check("postId", "postId is missing").exists().isInt();
  req.check("replies", "replies require").exists().isLength({ min: 2 });

  const postId = parseInt(req.params.id, 10);
  const { userId } = req.user;

  const { replies } = req.body;

  try {
    const repliesData = {
      replies: replies,
      repliedBy: userId,
      repliedOn: postId,
    };

    // query to insert replies detail in db
    const data = await pool.query("INSERT INTO replies SET ?", repliesData);
    if (data[0].affectedRows === 0) {
      return sendResponse(res, 404, [], " invalid userid or post id");
    }
    return sendResponse(res, 200, [], "replied on post");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return sendResponse(res, 500, [], "something went wrong");
  }
};
exports.updatetReplyByPostId = async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const replyid = parseInt(req.params.replyid, 10);
  const { userId } = req.user;

  const { replies } = req.body;

  try {
    const repliesData = {
      replies: replies,
      repliedBy: userId,
      repliedOn: postId,
    };

    // query to insert replies detail in db
    const data = await pool.query("UPDATE  replies SET ?  WHERE id = ?; ", [
      repliesData,
      replyid,
    ]);
    if (data[0].affectedRows === 0) {
      return sendResponse(res, 404, [], "reply not found ");
    }
    return sendResponse(res, 200, [], "replied on post");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return sendResponse(res, 500, [], "something went wrong");
  }
};
exports.deletetReplyByPostId = async (req, res) => {
  const replyid = parseInt(req.params.replyid, 10);

  try {
    const data = await pool.query("DELETE FROM replies WHERE id = ?; ", [
      replyid,
    ]);
    if (data[0].affectedRows === 0) {
      return sendResponse(res, 404, [], "reply not found ");
    }
    return sendResponse(res, 200, [], "reply deleted");
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, [], "something went wrong");
  }
};

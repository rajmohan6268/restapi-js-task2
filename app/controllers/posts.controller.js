const { sendResponse } = require("../helpers");
const pool = require("../db");

exports.getPosts = async (req, res) => {
  req.check("limit", "limit should be int").exists().isInt().optional();
  req.check("offset", "offset should be int").exists().isInt().optional();
  req
    .check("searchBy", "searchBy should be present")
    .exists()
    .isLength({ min: 3 })
    .optional();
  req
    .check("keyword", "keyword should be present")
    .exists()
    .isLength({ min: 3 })
    .optional();

  const errors = req.validationErrors();
  console.log(
    req.query,
    "keywordkeywordkeywordkeywordkeywordkeywordkeywordkeywordkeyword"
  );

  if (errors) {
    return sendResponse(res, 400, [], errors[0].msg);
  }

  const { limit } = req.query;
  const { offset } = req.query;
  const { searchBy } = req.query;
  const { keyword } = req.query;

  try {
    // get all posts
    let getQuery =
      "SELECT p.id, p.postTitle, p.description, u.username AS postedBy, p.createdAt FROM posts p INNER JOIN users u ON p.createdBy = u.id";

    // concatenate query with getQuery to get postedBy posts
    if (searchBy && keyword) {
      getQuery += ` WHERE ${searchBy} LIKE '%${keyword}'`;
    }

    // concatenate query with getQuery to get posts in limit
    if (limit && offset) {
      getQuery += ` LIMIT ${limit} OFFSET ${offset}`;
    }

    // console.log(getQuery);

    const [data] = await pool.query(getQuery);
    if (data.length === 0) {
      return sendResponse(res, 404, [], "not found");
    }

    // replyies query on post
    const replyQuery =
      "SELECT r.id as replyId, r.replies,r.repliedOn, r.createdAt, u.username as repliedBy FROM replies r INNER JOIN posts ON r.repliedOn = posts.id INNER JOIN users  u ON r.repliedBy = u.id";

    // execute query and get replies on a particular post
    const [replies] = await pool.query(replyQuery);

    data.forEach((post) => {
      const tempArr = [];
      replies.forEach((reply) => {
        if (reply.repliedOn === post.id) {
          tempArr.push(reply);
        }
      });
      post.replies = tempArr;
      post.repliesCount = tempArr.length;
    });

    return sendResponse(res, 200, data, "successful");
  } catch (err) {
    console.error(err);
    return sendResponse(
      res,
      500,
      [{ message: err.message }],
      "internal server error"
    );
  }
};

exports.getPostsbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const [data] = await pool.query(
      `SELECT p.id, p.postTitle, p.description, u.username AS postedBy, p.createdAt FROM posts p INNER JOIN users u ON p.createdBy = u.id WHERE p.id = ?`,
      [id]
    );
    if (data.length === 0) {
      return sendResponse(res, 404, [], "not found");
    }
    const replyQuery =
      "SELECT r.id as replyId, r.replies,r.repliedOn, r.createdAt, u.username as repliedBy FROM replies r INNER JOIN posts ON r.repliedOn = posts.id INNER JOIN users  u ON r.repliedBy = u.id";

    // execute query and get replies on a particular post
    const [replies] = await pool.query(replyQuery);

    data.forEach((post) => {
      const tempArr = [];
      replies.forEach((reply) => {
        if (reply.repliedOn === post.id) {
          tempArr.push(reply);
        }
      });
      post.replies = tempArr;
      post.repliesCount = tempArr.length;
    });

    return sendResponse(res, 200, data, "successful");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return sendResponse(
      res,
      500,
      [{ message: err.message }],
      "something went wrong"
    );
  }
};

exports.createPost = async (req, res) => {
  console.log(req.body);
  // validate
  req.checkBody("postTitle", "title is missing").exists();
  req
    .checkBody(
      "description",
      "description is too short or missing description field"
    )
    .exists();

  const errors = req.validationErrors();

  if (errors) {
    return sendResponse(res, 400, [], errors[0].msg);
  }

  try {
    // get loggedin userId
    const { userId } = req.user;

    const { postTitle, description } = req.body;

    // object of post
    const post = {
      postTitle,
      createdBy: userId,
      description,
    };

    const data = await pool.query("INSERT INTO posts SET ? ", post);
    if (data[0].affectedRows === 0) {
      return sendResponse(res, 404, [], "post added sucessfully");
    }
    return sendResponse(
      res,
      200,
      [{ postid: data[0].insertId }],
      "posted successful"
    );
  } catch (err) {
    console.error(err);
    return sendResponse(
      res,
      500,
      [{ message: err.message }],
      "something went wrong"
    );
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { postTitle, description } = req.body;
    const createdBy = req.user.userId;
    const { id } = req.params;
    console.log(id, "postTitle, createdBy, description, id");
    const data = await pool.query(
      `UPDATE posts SET postTitle = ?, description = ? WHERE id = ? AND createdBy = ?`,

      [postTitle, description, id, createdBy]
    );
    if (data[0].affectedRows === 0) {
      return sendResponse(res, 404, [], "post not found");
    }
    return sendResponse(res, 200, [data], "UPDATE successful");
  } catch (err) {
    console.error(err);
    return sendResponse(
      res,
      500,
      [{ message: err.message }],
      "something went wrong"
    );
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await pool.query("DELETE FROM posts WHERE id = ?", [id]);
    if (data[0].affectedRows === 0) {
      return sendResponse(res, 404, [], "post not found");
    }
    return sendResponse(res, 200, [data], "DELETE successful");
  } catch (err) {
    console.error(err);
    return sendResponse(
      res,
      500,
      [{ message: err.message }],
      "something went wrong"
    );
  }
};

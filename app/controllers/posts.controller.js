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
      "SELECT p.id, p.postTitle, p.description, u.username AS author, p.createdAt FROM posts p INNER JOIN users u ON p.createdBy = u.id";

    // concatenate query with getQuery to get author posts
    if (searchBy && keyword) {
      getQuery += ` WHERE ${searchBy} LIKE '%${keyword}'`;
    }

    // concatenate query with getQuery to get posts in limit
    if (limit && offset) {
      getQuery += ` LIMIT ${limit} OFFSET ${offset}`;
    }

    // console.log(getQuery);

    const [data] = await pool.query(getQuery);
    // console.log(data);
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
    return sendResponse(res, 500, [], "internal server error");
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

    return sendResponse(res, 200, [data], "posted successful");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return sendResponse(res, 500, [], "something went wrong");
  }
};

exports.updatePost = async (req, res) => {
  res.send("updatePost");
};

exports.deletePost = async (req, res) => {
  res.send("deletePost");
};

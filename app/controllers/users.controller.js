//deleteUser getUsers createUser updateUser
const pool = require("../db");
const bcrypt = require("bcrypt");
const sendResponse = require("../helpers/sendResponse");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    req
      .check("username", "username is required/ minimum 5 characters")
      .exists()
      .isLength({ min: 5 });
    req.check("email", "invalid email").exists().isEmail();
    req
      .check("password", "too short password/ minimum 5 characters")
      .exists()
      .isLength({ min: 5 });

    const errors = req.validationErrors();
    if (errors) {
      return sendResponse(res, 400, [], errors[0].msg);
    }

    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const userDetail = {
      username,
      email,
      password: hashedPassword,
    };

    const [newUser] = await pool.query("INSERT INTO users SET ? ", userDetail);

    const userData = {
      userId: newUser.insertId,
      userType: 0,
    };

    const token = jwt.sign(userData, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY || "1d",
    });
    // set token in response headers
    res.header("x-auth", token);

    return sendResponse(res, 200, { token }, "Registration successful");
  } catch (err) {
    //console.error(err);
    if (err.code === "ER_DUP_ENTRY") {
      return sendResponse(res, 409, [], "email/username already exist");
    }
    return sendResponse(
      res,
      500,
      [{ message: err.message }],
      "failed",
      "something went wrong"
    );
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await pool.query(
      "SELECT id ,username ,email ,userType from  users"
    );
    return sendResponse(res, 200, users[0], "users retrieved");
  } catch (err) {
    //console.error(err);
    return sendResponse(
      res,
      500,
      [{ message: err.message }],
      "something went wrong"
    );
  }
};
exports.updateUser = async (req, res) => {
  try {
    req
      .check("username", "username is required/ minimum 5 characters")
      .exists()
      .isLength({ min: 5 });
    req.check("email", "invalid email").exists().isEmail();
    req
      .check("password", "too short password/ minimum 5 characters")
      .exists()
      .isLength({ min: 5 });

    const errors = req.validationErrors();
    if (errors) {
      return sendResponse(res, 400, [], errors[0].msg);
    }

    const { username, email, userType } = req.body;

    const password = await bcrypt.hash(req.body.password, 10);

    const userDetail = {
      username,
      email,
      password,
      userType,
    };

    const [updatedUser] = await pool.query("UPDATE users SET ? WHERE id = ?", [
      userDetail,
      req.params.id,
    ]);
    if (updatedUser.affectedRows === 0) {
      return sendResponse(res, 404, [], "user not found");
    }
    return sendResponse(res, 200, [updatedUser], "user updated");
  } catch (err) {
    //console.error(err);
    return sendResponse(
      res,
      500,
      [{ message: err.message }],
      "something went wrong"
    );
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const [deletedUser] = await pool.query("DELETE FROM users WHERE id = ?", [
      req.params.id,
    ]);
    if (deletedUser.affectedRows === 0) {
      return sendResponse(res, 404, [], "user not found");
    }
    return sendResponse(res, 200, [], "user deleted");
  } catch (err) {
    //console.error(err);
    return sendResponse(
      res,
      500,
      [{ message: err.message }],
      "invalid userid , something went wrong"
    );
  }
};
exports.getusebyid = async (req, res) => {
  console.log(req.params.id);
  try {
    const [user] = await pool.query("SELECT * FROM  users WHERE id = ?", [
      req.params.id,
    ]);
    if (user.length === 0) {
      return sendResponse(res, 404, [], "user not found");
    }
    delete user[0].password;
    return sendResponse(res, 200, user[0], "user retrieved");
  } catch (err) {
    //console.error(err);
    return sendResponse(
      res,
      500,
      [{ message: err.message }],
      "something went wrong"
    );
  }
};

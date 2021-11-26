const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const port = process.env.PORT || 5000;
const expressValidator = require('express-validator');

// initiate app
const app = express();

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

//Set  headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Expose-Headers", "X-Powered-By, X-Auth");
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: "sucess",
    data: {
      register: "path is /api/register",
      login: "path is  /api/login",
      api_docs: "",
    },
    message: "Welcome to blog_api",
  });
});

// routes
//app.use("/api", routes);
require("./routes/auth.route")(app);
require("./routes/posts.route")(app);
require("./routes/users.route")(app);
require("./routes/replies.route")(app);

// listen port
app.listen(port, () => {
  console.log("listening on port no.:", port);
});

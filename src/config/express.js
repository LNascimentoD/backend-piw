const express = require("express");
const cors = require("cors");

const usersRoutes = require("../app/routes/users");
const postsRoutes = require("../app/routes/posts");
const commentsRoutes = require("../app/routes/comments");

module.exports = function () {
  const app = express();

  app.use(cors());
  app.use(express.json());
  usersRoutes(app);
  postsRoutes(app);
  commentsRoutes(app);

  return app;
};

const controller = require("../controllers/posts");
const controllerAuth = require("../controllers/authenticate");

module.exports = function (app) {
  app.use("/api/posts", controllerAuth.verify);

  app.post("/api/posts", controller.createPost);

  app.get("/api/posts", controller.listPosts);
  app.get("/api/posts/:id", controller.listPostById);
  app.get("/api/posts/:id/comments", controller.listCommentsByPost);

  app.delete("/api/posts/:id", controller.deletePostById);
};

const controller = require("../controllers/comments");
const controllerAuth = require("../controllers/authenticate");

module.exports = function (app) {
  app.use("/api/comments", controllerAuth.verify);

  app.post("/api/comments", controller.createComment);

  app.get("/api/comments", controller.listComment);
  app.get("/api/comments/:id", controller.listCommentById);

  app.delete("/api/comments/:id", controller.deleteCommentById);
};

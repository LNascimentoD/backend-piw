const controller = require("../controllers/users");
const controllerAuth = require("../controllers/authenticate");

module.exports = function (app) {
  app.post("/api/users", controller.createUser);
  app.post("/api/users/signin", controllerAuth.signin);

  app.use("/api/users", controllerAuth.verify);

  app.get("/api/users", controller.listUsers);
  app.get("/api/users/:id", controller.listUserById);
  app.get("/api/users/:id/posts", controller.listPostsByUser);

  app.delete("/api/users/:id", controller.deleteUserById);
};

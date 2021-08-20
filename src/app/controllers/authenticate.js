const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports.signin = function (req, res) {
  function login(user) {
    if (!user) {
      res.status(401).send("Invalid login");
    }
    if (!bcrypt.compareSync(req.body.senha, user.senha)) {
      fail();
    } else {
      let token = jwt.sign({ user: user }, "secret");
      res.status(200).json({
        message: "logado",
        token: token,
        userId: user.id,
        nome: user.nome,
      });
    }
  }

  function fail() {
    res.status(401).send("Invalid login");
  }

  if (!req.body.email) {
    res.status(401).send("Invalid login");
  }

  User.findOne({ email: req.body.email }).exec().then(login, fail);
};

module.exports.verify = function (req, res, next) {
  jwt.verify(req.headers.token, "secret", function (err, decoded) {
    if (err) {
      return res.status(401).json({ title: "Not Authenticated", error: err });
    }

    next();
  });
};

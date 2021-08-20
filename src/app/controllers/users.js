const User = require("../models/user");
const Post = require("../models/post");
const view = require("../views/user");
const viewPost = require("../views/post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.createUser = function (req, res) {
  const data = {
    nome: req.body.nome,
    email: req.body.email,
    senha: bcrypt.hashSync(req.body.senha, 10),
  };

  User.create(data)
    .then(function (user) {
      res.json(view.render(user)).status(201);
    })
    .catch(function (error) {
      res.status(500).json({ mensagem: "Falha ao criar o usuário!" });
    });
};

module.exports.listUsers = function (req, res) {
  User.find()
    .exec()
    .then(function (users) {
      res.json(view.renderMany(users)).status(200);
    })
    .catch(function (error) {
      res.status(404).json({ mensagem: "Not Found" });
    });
};

module.exports.listUserById = function (req, res) {
  const id = req.params.id;

  User.findById(id)
    .exec()
    .then(function (user) {
      res.json(view.render(user)).status(200);
    })
    .catch(function (error) {
      res.status(404).json({ mensagem: "Not Found" });
    });
};

module.exports.deleteUserById = function (req, res) {
  const id = req.params.id;
  const token = req.headers.token;

  const user_decode = jwt.decode(token);

  if (user_decode.user._id == id) {
    User.findOneAndDelete({ _id: id })
      .then(function (user) {
        res.json(view.render(user)).status(200);
      })
      .catch(function (error) {
        res.status(500).json({ mensagem: error });
      });
  } else {
    res
      .status(500)
      .json({ mensagem: "O usuário não pode  deletar esse usuário!" });
  }
};

module.exports.listPostsByUser = function (req, res) {
  const id = req.params.id;

  Post.find({ id_usuario: id })
    .exec()
    .then(function (posts) {
      res.json(viewPost.renderMany(posts)).status(200);
    })
    .catch(function (error) {
      res.status(404).json({ mensagem: "Not Found" });
    });
};

const Comment = require("../models/comment");
const view = require("../views/comment");
const jwt = require("jsonwebtoken");

module.exports.createComment = function (req, res) {
  const token = req.headers.token;

  const user_decode = jwt.decode(token);

  const data = {
    texto: req.body.texto,
    id_post: req.body.id_post,
    id_usuario: user_decode.user._id,
  };

  Comment.create(data)
    .then(function (comment) {
      res.json(view.render(comment)).status(201);
    })
    .catch(function (error) {
      res.status(500).json({ mensagem: "Falha ao criar o usuário!" });
    });
};

module.exports.listComment = function (req, res) {
  Comment.find()
    .exec()
    .then(function (comments) {
      res.json(view.renderMany(comments)).status(200);
    })
    .catch(function (error) {
      res.status(404).json({ mensagem: "Not Found" });
    });
};

module.exports.listCommentById = function (req, res) {
  const id = req.params.id;

  Comment.findById(id)
    .exec()
    .then(function (comment) {
      res.json(view.render(comment)).status(200);
    })
    .catch(function (error) {
      res.status(404).json({ mensagem: "Not Found" });
    });
};

module.exports.deleteCommentById = async function (req, res) {
  const id = req.params.id;
  const token = req.headers.token;

  const user_decode = jwt.decode(token);
  const comment = await Comment.findById(id).exec();

  if (user_decode.user._id == comment.id_usuario) {
    Comment.findOneAndDelete({ _id: id })
      .then(function (comment) {
        res.json(view.render(comment)).status(200);
      })
      .catch(function (error) {
        res.status(500).json({ mensagem: error });
      });
  } else {
    res
      .status(500)
      .json({ mensagem: "O usuário não pode deletar esse comentário!" });
  }
};

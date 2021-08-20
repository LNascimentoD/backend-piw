const Post = require("../models/post");
const Comment = require("../models/comment");
const view = require("../views/post");
const viewComment = require("../views/comment");
const jwt = require("jsonwebtoken");

module.exports.createPost = function (req, res) {
  const token = req.headers.token;

  const user_decode = jwt.decode(token);

  const data = {
    texto: req.body.texto,
    likes: req.body.likes,
    id_usuario: user_decode.user._id,
  };

  Post.create(data)
    .then(function (post) {
      res.json(view.render(post)).status(201);
    })
    .catch(function (error) {
      res.status(500).json({ mensagem: "Falha ao criar o usuário!" });
    });
};

module.exports.listPosts = function (req, res) {
  Post.find()
    .exec()
    .then(function (posts) {
      res.json(view.renderMany(posts)).status(200);
    })
    .catch(function (error) {
      res.status(404).json({ mensagem: "Not Found" });
    });
};

module.exports.listPostById = function (req, res) {
  const id = req.params.id;

  Post.findById(id)
    .exec()
    .then(function (post) {
      res.json(view.render(post)).status(200);
    })
    .catch(function (error) {
      res.status(404).json({ mensagem: "Not Found" });
    });
};

module.exports.deletePostById = async function (req, res) {
  const id = req.params.id;
  const token = req.headers.token;

  const user_decode = jwt.decode(token);
  const post = await Post.findById(id).exec();

  if (user_decode.user._id == post.id_usuario) {
    Post.findOneAndDelete({ _id: id })
      .then(function (post) {
        res.json(view.render(post)).status(200);
      })
      .catch(function (error) {
        res.status(500).json({ mensagem: error });
      });
  } else {
    res.status(500).json({ mensagem: "O usuário não pode deletar esse post!" });
  }
};

module.exports.listCommentsByPost = function (req, res) {
  const id = req.params.id;

  Comment.find({ id_post: id })
    .exec()
    .then(function (comments) {
      res.json(viewComment.renderMany(comments)).status(200);
    })
    .catch(function (error) {
      res.status(404).json({ mensagem: "Not Found" });
    });
};

/*
module.exports.listPostsByUser = function (req, res) {
  const id = req.params.id;

  Post.find({ id_usuario: id })
    .populate("id_usuario")
    .exec()
    .then(function (posts) {
      res.json(view.renderPostsByUser(posts)).status(200);
    })
    .catch(function (error) {
      res.status(400).json({ mensagem: error });
    });
};
*/

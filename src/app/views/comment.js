function render(comment) {
  return {
    id: comment._id,
    texto: comment.texto,
    id_usuario: comment.id_usuario,
    id_post: comment.id_post,
  };
}

module.exports.render = render;

function renderMany(comments) {
  return comments.map(function (comment) {
    return {
      id: comment._id,
      texto: comment.texto,
      id_usuario: comment.id_usuario,
      id_post: comment.id_post,
    };
  });
}

module.exports.renderMany = renderMany;

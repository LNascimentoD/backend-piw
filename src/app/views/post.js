function render(post) {
  return {
    id: post._id,
    texto: post.texto,
    likes: post.likes,
    id_usuario: post.id_usuario,
  };
}

module.exports.render = render;

function renderMany(posts) {
  return posts.map(function (post) {
    return {
      id: post._id,
      texto: post.texto,
      likes: post.likes,
      id_usuario: post.id_usuario,
    };
  });
}

module.exports.renderMany = renderMany;

function renderPostsByUser(data) {
  return {
    id: data[0].id_usuario._id,
    nome: data[0].id_usuario.nome,
    email: data[0].id_usuario.email,
    posts: data.map(function (post) {
      return { id: post._id, texto: post.texto, likes: post.likes };
    }),
  };
}

module.exports.renderPostsByUser = renderPostsByUser;

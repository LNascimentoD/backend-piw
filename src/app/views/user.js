function render(user) {
  return {
    id: user._id,
    nome: user.nome,
    email: user.email,
  };
}

module.exports.render = render;

function renderMany(users) {
  return users.map(function (user) {
    return { id: user._id, nome: user.nome, email: user.email };
  });
}

module.exports.renderMany = renderMany;

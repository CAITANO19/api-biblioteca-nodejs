const sequelize = require('../config/database');
const Autor = require('./Autor');
const Livro = require('./Livro');

Autor.hasMany(Livro, {
  foreignKey: 'autorId',
  as: 'livros'
});

Livro.belongsTo(Autor, {
  foreignKey: 'autorId',
  as: 'autor'
});

module.exports = {
  sequelize,
  Autor,
  Livro
};

const { sequelize, Autor, Livro } = require('./models');

async function seed() {
  await sequelize.sync({ force: true });

  const autor = await Autor.create({
    nome: 'Machado de Assis',
    email: 'machado@email.com',
    nacionalidade: 'Brasileira'
  });

  await Livro.create({
    titulo: 'Dom Casmurro',
    anoPublicacao: 1899,
    genero: 'Romance',
    autorId: autor.id
  });

  console.log('Dados iniciais cadastrados com sucesso.');
  await sequelize.close();
}

seed().catch((error) => {
  console.error('Erro ao cadastrar dados iniciais:', error.message);
});

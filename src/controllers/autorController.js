const { Autor, Livro } = require('../models');

async function listarAutores(req, res, next) {
  try {
    const autores = await Autor.findAll({
      include: {
        model: Livro,
        as: 'livros'
      }
    });

    return res.json(autores);
  } catch (error) {
    return next(error);
  }
}

async function buscarAutorPorId(req, res, next) {
  try {
    const autor = await Autor.findByPk(req.params.id, {
      include: {
        model: Livro,
        as: 'livros'
      }
    });

    if (!autor) {
      return res.status(404).json({ mensagem: 'Autor não encontrado.' });
    }

    return res.json(autor);
  } catch (error) {
    return next(error);
  }
}

async function criarAutor(req, res, next) {
  try {
    const autor = await Autor.create(req.body);
    return res.status(201).json(autor);
  } catch (error) {
    return next(error);
  }
}

async function atualizarAutor(req, res, next) {
  try {
    const autor = await Autor.findByPk(req.params.id);

    if (!autor) {
      return res.status(404).json({ mensagem: 'Autor não encontrado.' });
    }

    await autor.update(req.body);
    return res.json(autor);
  } catch (error) {
    return next(error);
  }
}

async function excluirAutor(req, res, next) {
  try {
    const autor = await Autor.findByPk(req.params.id, {
      include: {
        model: Livro,
        as: 'livros'
      }
    });

    if (!autor) {
      return res.status(404).json({ mensagem: 'Autor não encontrado.' });
    }

    if (autor.livros.length > 0) {
      return res.status(400).json({
        mensagem: 'Não é possível excluir um autor que possui livros cadastrados.'
      });
    }

    await autor.destroy();
    return res.json({ mensagem: 'Autor excluído com sucesso.' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listarAutores,
  buscarAutorPorId,
  criarAutor,
  atualizarAutor,
  excluirAutor
};

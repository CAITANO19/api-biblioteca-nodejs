const { Autor, Livro } = require('../models');

async function listarLivros(req, res, next) {
  try {
    const livros = await Livro.findAll({
      include: {
        model: Autor,
        as: 'autor'
      }
    });

    return res.json(livros);
  } catch (error) {
    return next(error);
  }
}

async function buscarLivroPorId(req, res, next) {
  try {
    const livro = await Livro.findByPk(req.params.id, {
      include: {
        model: Autor,
        as: 'autor'
      }
    });

    if (!livro) {
      return res.status(404).json({ mensagem: 'Livro não encontrado.' });
    }

    return res.json(livro);
  } catch (error) {
    return next(error);
  }
}

async function criarLivro(req, res, next) {
  try {
    const autor = await Autor.findByPk(req.body.autorId);

    if (!autor) {
      return res.status(404).json({ mensagem: 'Autor informado não existe.' });
    }

    const livro = await Livro.create(req.body);
    return res.status(201).json(livro);
  } catch (error) {
    return next(error);
  }
}

async function atualizarLivro(req, res, next) {
  try {
    const livro = await Livro.findByPk(req.params.id);

    if (!livro) {
      return res.status(404).json({ mensagem: 'Livro não encontrado.' });
    }

    const autor = await Autor.findByPk(req.body.autorId);

    if (!autor) {
      return res.status(404).json({ mensagem: 'Autor informado não existe.' });
    }

    await livro.update(req.body);
    return res.json(livro);
  } catch (error) {
    return next(error);
  }
}

async function excluirLivro(req, res, next) {
  try {
    const livro = await Livro.findByPk(req.params.id);

    if (!livro) {
      return res.status(404).json({ mensagem: 'Livro não encontrado.' });
    }

    await livro.destroy();
    return res.json({ mensagem: 'Livro excluído com sucesso.' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listarLivros,
  buscarLivroPorId,
  criarLivro,
  atualizarLivro,
  excluirLivro
};

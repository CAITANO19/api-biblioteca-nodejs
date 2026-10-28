function errorHandler(error, req, res, next) {
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({
      mensagem: 'JSON inválido no corpo da requisição.'
    });
  }

  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      mensagem: 'Registro duplicado.',
      detalhe: error.errors.map((item) => item.message)
    });
  }

  return res.status(500).json({
    mensagem: 'Erro interno do servidor.',
    detalhe: error.message
  });
}

module.exports = errorHandler;

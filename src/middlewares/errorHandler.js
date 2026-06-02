function errorHandler(error, req, res, next) {
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

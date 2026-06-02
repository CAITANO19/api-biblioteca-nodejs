function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        mensagem: 'Erro de validação.',
        erros: result.error.errors.map((erro) => ({
          campo: erro.path.join('.'),
          mensagem: erro.message
        }))
      });
    }

    req.body = result.data;
    return next();
  };
}

module.exports = validate;

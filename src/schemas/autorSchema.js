const { z } = require('zod');

const texto = (campo) => ({
  required_error: `O campo ${campo} é obrigatório.`,
  invalid_type_error: `O campo ${campo} deve ser um texto.`
});

const autorSchema = z.object({
  nome: z.string(texto('nome')).min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  email: z.string(texto('email')).email('Informe um e-mail válido.'),
  nacionalidade: z.string(texto('nacionalidade')).min(3, 'A nacionalidade deve ter pelo menos 3 caracteres.')
});

module.exports = autorSchema;

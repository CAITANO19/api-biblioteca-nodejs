const { z } = require('zod');

const autorSchema = z.object({
  nome: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  email: z.string().email('Informe um e-mail válido.'),
  nacionalidade: z.string().min(3, 'A nacionalidade deve ter pelo menos 3 caracteres.')
});

module.exports = autorSchema;

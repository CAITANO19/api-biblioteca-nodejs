const { z } = require('zod');

const livroSchema = z.object({
  titulo: z.string().min(2, 'O título deve ter pelo menos 2 caracteres.'),
  anoPublicacao: z.number().int('O ano deve ser um número inteiro.').min(1000, 'Informe um ano válido.').max(new Date().getFullYear(), 'O ano não pode ser maior que o ano atual.'),
  genero: z.string().min(3, 'O gênero deve ter pelo menos 3 caracteres.'),
  autorId: z.number().int('O autorId deve ser um número inteiro.').positive('O autorId deve ser positivo.')
});

module.exports = livroSchema;

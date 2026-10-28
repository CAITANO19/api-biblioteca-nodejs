const { z } = require('zod');

const texto = (campo) => ({
  required_error: `O campo ${campo} é obrigatório.`,
  invalid_type_error: `O campo ${campo} deve ser um texto.`
});

const numero = (campo) => ({
  required_error: `O campo ${campo} é obrigatório.`,
  invalid_type_error: `O campo ${campo} deve ser um número.`
});

const livroSchema = z.object({
  titulo: z.string(texto('titulo')).min(2, 'O título deve ter pelo menos 2 caracteres.'),
  anoPublicacao: z.number(numero('anoPublicacao')).int('O ano deve ser um número inteiro.').min(1000, 'Informe um ano válido.').max(new Date().getFullYear(), 'O ano não pode ser maior que o ano atual.'),
  genero: z.string(texto('genero')).min(3, 'O gênero deve ter pelo menos 3 caracteres.'),
  autorId: z.number(numero('autorId')).int('O autorId deve ser um número inteiro.').positive('O autorId deve ser positivo.')
});

module.exports = livroSchema;

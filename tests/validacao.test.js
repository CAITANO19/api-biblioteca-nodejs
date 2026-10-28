const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const validate = require('../src/middlewares/validate');
const errorHandler = require('../src/middlewares/errorHandler');
const autorSchema = require('../src/schemas/autorSchema');
const livroSchema = require('../src/schemas/livroSchema');

let servidor;
let baseUrl;

before(async () => {
  const app = express();
  app.use(express.json());
  app.post('/autores', validate(autorSchema), (req, res) => res.status(201).json(req.body));
  app.post('/livros', validate(livroSchema), (req, res) => res.status(201).json(req.body));
  app.post('/erro', (req, res, next) => next(new Error('falha interna')));
  app.use(errorHandler);

  await new Promise((resolve) => {
    servidor = app.listen(0, resolve);
  });
  baseUrl = `http://localhost:${servidor.address().port}`;
});

after(() => servidor.close());

async function post(rota, corpo) {
  const resposta = await fetch(baseUrl + rota, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: corpo
  });
  return { status: resposta.status, json: await resposta.json() };
}

const autorValido = { nome: 'Clarice Lispector', email: 'clarice@email.com', nacionalidade: 'Brasileira' };
const livroValido = { titulo: 'Dom Casmurro', anoPublicacao: 1899, genero: 'Romance', autorId: 1 };

test('JSON malformado retorna 400 sem expor detalhes do parser', async () => {
  const { status, json } = await post('/autores', '{nome:');
  assert.equal(status, 400);
  assert.equal(json.mensagem, 'JSON inválido no corpo da requisição.');
  assert.equal(json.detalhe, undefined);
});

test('autor sem campos retorna 400 com mensagens em português', async () => {
  const { status, json } = await post('/autores', '{}');
  assert.equal(status, 400);
  assert.deepEqual(
    json.erros.map((erro) => erro.mensagem),
    [
      'O campo nome é obrigatório.',
      'O campo email é obrigatório.',
      'O campo nacionalidade é obrigatório.'
    ]
  );
});

test('autor com tipo inválido retorna 400', async () => {
  const { status, json } = await post('/autores', JSON.stringify({ ...autorValido, nome: 5 }));
  assert.equal(status, 400);
  assert.equal(json.erros[0].mensagem, 'O campo nome deve ser um texto.');
});

test('autor com e-mail inválido retorna 400', async () => {
  const { status, json } = await post('/autores', JSON.stringify({ ...autorValido, email: 'invalido' }));
  assert.equal(status, 400);
  assert.equal(json.erros[0].mensagem, 'Informe um e-mail válido.');
});

test('autor válido retorna 201', async () => {
  const { status, json } = await post('/autores', JSON.stringify(autorValido));
  assert.equal(status, 201);
  assert.deepEqual(json, autorValido);
});

test('livro sem campos retorna 400 com os quatro campos obrigatórios', async () => {
  const { status, json } = await post('/livros', '{}');
  assert.equal(status, 400);
  assert.deepEqual(
    json.erros.map((erro) => erro.campo),
    ['titulo', 'anoPublicacao', 'genero', 'autorId']
  );
});

test('livro com ano em texto retorna 400', async () => {
  const { status, json } = await post('/livros', JSON.stringify({ ...livroValido, anoPublicacao: '1899' }));
  assert.equal(status, 400);
  assert.equal(json.erros[0].mensagem, 'O campo anoPublicacao deve ser um número.');
});

test('livro válido retorna 201', async () => {
  const { status, json } = await post('/livros', JSON.stringify(livroValido));
  assert.equal(status, 201);
  assert.deepEqual(json, livroValido);
});

test('erro inesperado continua retornando 500', async () => {
  const { status, json } = await post('/erro', '{}');
  assert.equal(status, 500);
  assert.equal(json.mensagem, 'Erro interno do servidor.');
});

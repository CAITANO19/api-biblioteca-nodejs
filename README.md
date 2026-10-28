# API Biblioteca (Node.js)

API RESTful simples para gerenciar **autores** e **livros**, construída com Node.js, Express, Sequelize, Zod e SQLite.

## Funcionalidades

- CRUD completo de autores (`/autores`) e de livros (`/livros`)
- Relacionamento 1:N: um autor possui vários livros
- Validação dos dados de entrada com **Zod**, em um middleware reutilizável
- Tratamento centralizado de erros (por exemplo, `409` para registro duplicado)
- Script de *seed* com dados iniciais

## Tecnologias

Node.js · Express · Sequelize · SQLite · Zod · Nodemon

## Como executar

Pré-requisito: Node.js.

```bash
git clone https://github.com/CAITANO19/api-biblioteca-nodejs.git
cd api-biblioteca-nodejs

npm install
npm run seed   # opcional: cria as tabelas e insere dados de exemplo
npm run dev    # desenvolvimento, com recarga automática
# ou
npm start
```

O servidor sobe em `http://localhost:3000`. O banco é um arquivo SQLite (`database.sqlite`) criado na raiz do projeto.

> Atenção: `npm run seed` recria as tabelas e apaga os dados existentes.

## Endpoints

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/` | Status da API e rotas disponíveis |
| GET | `/autores` | Lista autores |
| GET | `/autores/:id` | Busca um autor |
| POST | `/autores` | Cria um autor |
| PUT | `/autores/:id` | Atualiza um autor |
| DELETE | `/autores/:id` | Remove um autor |
| GET | `/livros` | Lista livros |
| GET | `/livros/:id` | Busca um livro |
| POST | `/livros` | Cria um livro |
| PUT | `/livros/:id` | Atualiza um livro |
| DELETE | `/livros/:id` | Remove um livro |

## Modelos e validações

**Autor**

```json
{ "nome": "Machado de Assis", "email": "machado@email.com", "nacionalidade": "Brasileira" }
```

`nome` e `nacionalidade` com pelo menos 3 caracteres; `email` válido.

**Livro**

```json
{ "titulo": "Dom Casmurro", "anoPublicacao": 1899, "genero": "Romance", "autorId": 1 }
```

`titulo` com pelo menos 2 caracteres; `genero` com pelo menos 3; `anoPublicacao` inteiro entre 1000 e o ano atual; `autorId` inteiro positivo.

## Estrutura

```
src/
  app.js, server.js     configuração do Express e inicialização
  config/               conexão com o banco
  models/               Autor, Livro e associações
  routes/               rotas de autores e livros
  controllers/          lógica de cada recurso
  schemas/              validações com Zod
  middlewares/          validate e errorHandler
  seed.js               dados iniciais
```

## Autor

Victor Caitano — [@CAITANO19](https://github.com/CAITANO19)

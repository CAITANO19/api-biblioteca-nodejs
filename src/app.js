const express = require('express');
const autorRoutes = require('./routes/autorRoutes');
const livroRoutes = require('./routes/livroRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.json({
    mensagem: 'API Biblioteca Node.js funcionando.',
    rotas: {
      autores: '/autores',
      livros: '/livros'
    }
  });
});

app.use('/autores', autorRoutes);
app.use('/livros', livroRoutes);
app.use(errorHandler);

module.exports = app;

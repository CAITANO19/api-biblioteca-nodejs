const { Router } = require('express');
const livroController = require('../controllers/livroController');
const livroSchema = require('../schemas/livroSchema');
const validate = require('../middlewares/validate');

const router = Router();

router.get('/', livroController.listarLivros);
router.get('/:id', livroController.buscarLivroPorId);
router.post('/', validate(livroSchema), livroController.criarLivro);
router.put('/:id', validate(livroSchema), livroController.atualizarLivro);
router.delete('/:id', livroController.excluirLivro);

module.exports = router;

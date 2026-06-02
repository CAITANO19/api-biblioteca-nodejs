const { Router } = require('express');
const autorController = require('../controllers/autorController');
const autorSchema = require('../schemas/autorSchema');
const validate = require('../middlewares/validate');

const router = Router();

router.get('/', autorController.listarAutores);
router.get('/:id', autorController.buscarAutorPorId);
router.post('/', validate(autorSchema), autorController.criarAutor);
router.put('/:id', validate(autorSchema), autorController.atualizarAutor);
router.delete('/:id', autorController.excluirAutor);

module.exports = router;

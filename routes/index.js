const router = require('express').Router();

const lojasRouter = require('./categorias');
const frotaRouter = require('./manutencoes');

router.use('/lojas', lojasRouter);
router.use('/frota', frotaRouter);

module.exports = router;
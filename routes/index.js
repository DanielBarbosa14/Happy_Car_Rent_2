const router = require('express').Router();

const lojasRouter = require('./lojas');
const frotaRouter = require('./frota');

router.use('/lojas', lojasRouter);
router.use('/frota', frotaRouter);

module.exports = router;
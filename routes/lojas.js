const lojasRouter = require('express').Router();
const controller = require('../controllers/loja');

lojasRouter.get('/', controller.getAll); //id categoria
lojasRouter.get('/:id', controller.getById); //id categoria
lojasRouter.post('/create', controller.create); //create new categoria
lojasRouter.put('/update/:id', controller.update); //update categoria
lojasRouter.delete('/delete/:id', controller.delete); //delete categoria

module.exports = lojasRouter;
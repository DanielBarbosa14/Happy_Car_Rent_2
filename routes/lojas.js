const lojasRouter = require('express').Router();
const controller = require('../controllers/loja');

lojasRouter.get('/:id', controller.getById); //id categoria
lojasRouter.post('/create', controller.create); //create new categoria
lojasRouter.put('/update/:id', controller.update); //update categoria
lojasRouter.delete('/delete/:id', controller.delete); //delete categoria

module.exports = lojasRouter;
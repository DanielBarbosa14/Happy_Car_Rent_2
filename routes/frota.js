const frotaRouter = require('express').Router();
const controller = require('../controllers/frota');

frotaRouter.get('/:id', controller.getById); //id categoria
frotaRouter.post('/create', controller.create); //create new categoria
frotaRouter.put('/update/:id', controller.update); //update categoria
frotaRouter.delete('/delete/:id', controller.delete); //delete categoria

module.exports = frotaRouter;
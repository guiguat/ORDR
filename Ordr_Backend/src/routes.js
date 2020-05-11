const express = require("express");

const produtoController = require('./controllers/produtoController');
const pedidoController = require('./controllers/pedidoController');
const relatorioController = require('./controllers/relatorioController');
const funcionarioController = require('./controllers/funcionarioController');
const clienteController = require('./controllers/clienteController');
const contasController = require('./controllers/contasController');

const routes = express.Router();

// GET, POST, PUT, DELETE
// req.query = Acessar query params (para filtros)
// req.params = Acessar route params (para edicao, delete)
// req.body = Acessar corpo da requisicao (para criacao, edicao)

//funcionario

//produtos
routes.get('/produto', produtoController.index);
routes.post('/produto', produtoController.create);
routes.put('/produto', produtoController.edit);
routes.put('/produto/estoque', produtoController.estoque);
routes.delete('/produto', produtoController.delete);

//pedido
routes.post('/pedido', pedidoController.create);
routes.get('/pedido', pedidoController.index);
routes.delete('/pedido', pedidoController.delete);

//relatorio
routes.get('/relatorio', relatorioController.index);
routes.post('/relatorio', relatorioController.abrir);
routes.put('/relatorio', relatorioController.add);

// Funcionario
routes.delete('/funcionario', funcionarioController.delete);
routes.get('/funcionario', funcionarioController.index);

// Contas
routes.get('/contas', contasController.index);
routes.post('/contas', contasController.create);
routes.delete('/contas', contasController.delete);

// Cliente
routes.get('/cliente', clienteController.index);
routes.post('/cliente', clienteController.create);
routes.put('/cliente', clienteController.edit);
routes.delete('/cliente', clienteController.delete);


module.exports = routes;
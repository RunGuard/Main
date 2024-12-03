var express = require('express');
var router = express.Router();

var serverController = require('../controllers/serverController');


// Rota para buscar servidores de um equipamento específico
router.get('/buscarServidor/:fkEquipamento', function (req, res) {

    serverController.buscarServidor(req, res);
});

module.exports = router;

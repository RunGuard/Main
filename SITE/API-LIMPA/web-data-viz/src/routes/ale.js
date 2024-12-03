const express = require('express');
const router = express.Router();
const aleController = require('../controllers/aleController');

// Rota para obter dados de um equipamento específico
router.get('/obterDados/:fkEquipamento', aleController.obterDados);


// Rota para buscar servidores
router.get('/buscarServidor', aleController.buscarServidor);

module.exports = router;

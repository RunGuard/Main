var express = require("express");
var router = express.Router();

var roqueController = require("../controllers/roqueController");

router.get("/ultimaMedida/:fkEquipamento", function (req, res) {
    roqueController.buscarMedidas(req, res);
});

router.get("/medidasPorPeriodo/:fkEquipamento/:mes/:semana?", function (req, res) {
    roqueController.buscarMedidasPorPeriodo(req, res);
});


router.get("/servidores", function (req, res) {
    roqueController.buscarServidor(req, res);
});

module.exports = router;

var express = require("express");
var router = express.Router();

var dashboardDiegoController = require("../controllers/dashboardDiegoController.js");

router.get(`/atualizarGrafico/:minValue/:maxValue`, function(req,res) {
    dashboardDiegoController.atualizarGrafico(req,res);
});

router.get(`/coletarDados/:minValue/:maxValue`, function(req,res) {
    dashboardDiegoController.coletarDados(req,res);
});

router.get(`/graficoDetails/:mes`, function(req,res) {
    dashboardDiegoController.graficoDetails(req,res);
});

module.exports = router;
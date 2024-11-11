var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/listar", function (req, res) {
    dashboardController.listar(req, res);
});

router.get(`/listarDetalhes/:idEquipamentoBuscado`, function(req,res) {
    dashboardController.listarDetalhes(req,res)
});

router.get("/maiorValor", function(req,res) {
    dashboardController.maiorValor(req,res)
})
  
// gráficos dashboard 1
router.get("/atualizarGrafico1/:idEquipamentoBuscado", function(req, res) {
    dashboardController.atualizarGrafico1(req,res)
});

// gráficos dashboard 2
router.get("/atualizarGrafico2", function(req, res) {
    dashboardController.atualizarGrafico2(req,res)
});

router.get("/atualizarGrafico3", function(req, res) {
    dashboardController.atualizarGrafico3(req,res)
});

// médias dashboard 2
router.get("/percentualRAM", function(req, res) {
    dashboardController.percentualRAM(req,res)
});

router.get("/percentualCPU", function(req, res) {
    dashboardController.percentualCPU(req,res)
});

module.exports = router;
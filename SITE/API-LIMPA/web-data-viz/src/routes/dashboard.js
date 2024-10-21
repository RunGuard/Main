var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/listar", function (req, res) {
    dashboardController.listar(req, res);
});

router.get(`/listarDetalhes/:idEquipamentoBuscado`, function(req,res) {
    dashboardController.listarDetalhes(req,res)
});
  
router.get("/atualizarGrafico1", function(req, res) {
    dashboardController.atualizarGrafico1(req,res)
});

router.get("/percentualRAM", function(req, res) {
    dashboardController.percentualRAM(req,res)
});

router.get("/percentualCPU", function(req, res) {
    dashboardController.percentualCPU(req,res)
});

module.exports = router;
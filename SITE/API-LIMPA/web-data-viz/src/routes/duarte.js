var express = require("express");
var router = express.Router();

var duarteController = require("../controllers/duarteController");

router.get("/percentualMemoriaRAM/:fkEquipamento", function (req, res) {
    duarteController.puxarPercentualRam(req, res);
});

router.get("/percentualCPU/:fkEquipamento", function (req, res) {
    duarteController.puxarPercentualCPU(req, res);
});

router.get("/comparacaoLatencia/:fkEquipamento", function (req, res) {
    duarteController.puxarComparacao(req, res);
});

router.get("/kpiSobrecargaCpu/:fkEquipamento", function (req, res) {
    duarteController.puxarSobrecargaCPU(req, res);
});

router.get("/kpiSobrecargaRam/:fkEquipamento", function (req, res) {
    duarteController.puxarSobrecargaRAM(req, res);
});
module.exports = router;
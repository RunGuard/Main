var express = require("express");
var router = express.Router();

var dashboardAnneController = require("../controllers/dashboardAnneController.js");

router.get(`/minimoRAM`, function (req, res) {
    dashboardAnneController.minimoRAM(req, res);
});

router.get(`/servidorMinimoRAM`, function (req, res) {
    dashboardAnneController.servidorMinimoRAM(req, res);
});

router.get(`/servidorMinimoTempoRAM`, function (req, res) {
    dashboardAnneController.servidorMinimoTempoRAM(req, res);
});

router.get(`/maximoRAM`, function (req, res) {
    dashboardAnneController.maximoRAM(req, res);
});

router.get(`/servidorMaximoRAM`, function (req, res) {
    dashboardAnneController.servidorMaximoRAM(req, res);
});

router.get(`/servidorMaximoTempoRAM`, function (req, res) {
    dashboardAnneController.servidorMaximoTempoRAM(req, res);
});

router.get(`/minimoCPU`, function (req, res) {
    dashboardAnneController.minimoCPU(req, res);
});

router.get(`/servidorMinimoCPU`, function (req, res) {
    dashboardAnneController.servidorMinimoCPU(req, res);
});

router.get(`/servidorMinimoTempoCPU`, function (req, res) {
    dashboardAnneController.servidorMinimoTempoCPU(req, res);
});

router.get(`/maximoCPU`, function (req, res) {
    dashboardAnneController.maximoCPU(req, res);
});

router.get(`/servidorMaximoCPU`, function (req, res) {
    dashboardAnneController.servidorMaximoCPU(req, res);
});

router.get(`/servidorMaximoTempoCPU`, function (req, res) {
    dashboardAnneController.servidorMaximoTempoCPU(req, res);
});

router.get('/servidores', function (req, res) {
    dashboardAnneController.obterServidores(req, res);
});

router.get('/servidores/:idEquipamento', function (req, res) {
    dashboardAnneController.obterVariabilidadeCPU(req, res);
});

router.get('/comparacao1', function (req, res) {
    dashboardAnneController.getServidoresComparacao1(req, res);
});

router.get('/dadosComparacao1/:idEquipamento', function (req, res) {
    dashboardAnneController.obterDadosComp1(req, res);
});

router.get('/comparacao2', function (req, res) {
    dashboardAnneController.getServidoresComparacao2(req, res);
});

router.get('/dadosComparacao2/:idEquipamento', function (req, res) {
    dashboardAnneController.obterDadosComp2(req, res);
});

module.exports = router;

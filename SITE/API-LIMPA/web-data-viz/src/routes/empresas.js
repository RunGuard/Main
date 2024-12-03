var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.get("/listar", function (req, res) {
  empresaController.listar(req, res);
});

router.get("/buscar", function (req, res) {
  empresaController.buscarPorCnpj(req, res);
});

router.post("/cadastrarEmpresa", function (req, res) {
    empresaController.cadastrarEmpresa(req, res);
})

router.post("/cadastrarEquipamento", function (req, res) {
  empresaController.cadastrarEquipamento(req, res);
})

router.post("/cadastrar", function (req, res) {
  empresaController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
  empresaController.autenticar(req, res);
});


// router.get("/buscar/:id", function (req, res) {
//   empresaController.buscarPorId(req, res);
// });


module.exports = router;
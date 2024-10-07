var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/listar", function (req, res) {
    dashboardController.listar(req, res);
});

router.get(`/listarDetalhes/:idEquipamentoBuscado`, function(req,res) {
    dashboardController.listarDetalhes(req,res)
});
  
module.exports = router;
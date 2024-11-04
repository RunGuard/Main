var express = require("express");
var router = express.Router();

var dashboardDiegoController = require("../controllers/dashboardDiegoController.js");

router.get('/atualizarGrafico', function(req,res) {
    dashboardDiegoController.atualizarGrafico(req,res);
});

module.exports = router;
var express = require("express");
var router = express.Router();

var roqueController = require("../controllers/roqueController");

router.get("/ultimaMedida/:fkEquipamento", function (req, res) {
    roqueController.buscarMedidas(req, res);
});

module.exports = router;

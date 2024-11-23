var express = require("express");
var router = express.Router();

var duarteController = require("../controllers/duarteController");

router.get("/percentualMemoriaRAM/:fkEquipamento", function (req, res) {
    duarteController.puxarPercentualRam(req, res);
});

module.exports = router;
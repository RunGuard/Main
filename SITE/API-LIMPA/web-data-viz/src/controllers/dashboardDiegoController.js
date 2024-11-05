var dashboardDiegoModel = require("../models/dashboardDiegoModel.js");

function atualizarGrafico(req, res) {
    dashboardDiegoModel.atualizarGrafico()
    .then(function (resultado) {
        res.status(200).json(resultado);
    })
}

module.exports = {
    atualizarGrafico,
}
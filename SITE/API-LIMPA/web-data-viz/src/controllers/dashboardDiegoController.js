var dashboardDiegoModel = require("../models/dashboardDiegoModel.js");

function atualizarGrafico(req, res) {
    var mes1 = req.params.minValue
    var mes2 = req.params.maxValue

    dashboardDiegoModel.atualizarGrafico(mes1, mes2)
    .then(function (resultado) {
        res.status(200).json(resultado);
    })
}

function coletarDados(req, res) {
    var mes1 = req.params.minValue
    var mes2 = req.params.maxValue

    dashboardDiegoModel.coletarDados(mes1, mes2)
    .then(function (resultado) {
        res.status(200).json(resultado)
    })
}

function graficoDetails(req, res) {
    var mes = req.params.mes

    dashboardDiegoModel.graficoDetails(mes)
    .then(function (resultado) {
        res.status(200).json(resultado)
    })
}

module.exports = {
    atualizarGrafico,
    coletarDados,
    graficoDetails,
}
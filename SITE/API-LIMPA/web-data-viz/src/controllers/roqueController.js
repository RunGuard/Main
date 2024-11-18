var roqueModel = require("../models/roqueModel");

function buscarMedidas(req, res) {
    var fkEquipamento = req.params.fkEquipamento;

    roqueModel.buscarMedidaModel(fkEquipamento)
        .then(function (resultado) {

            res.status(200).json(resultado);
        })
}

function buscarServidor(req, res) {
    roqueModel.buscarServidores()
        .then(function (servidores) {
            res.status(200).json(servidores);
        });
}

module.exports = {
    buscarMedidas,
    buscarServidor
};

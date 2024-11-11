var roqueModel = require("../models/roqueModel");

function buscarMedidas(req, res) {
    var fkEquipamento = req.params.fkEquipamento;

    roqueModel.buscarMedidaModel(fkEquipamento)
        .then(function (resultado) {

            res.status(200).json(resultado);
        })
}

module.exports = {
    buscarMedidas
};

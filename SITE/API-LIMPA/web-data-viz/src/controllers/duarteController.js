var duarteModel = require("../models/duarteModel");

function puxarPercentualRam(req, res) {
    var fkEquipamento = req.params.fkEquipamento

    duarteModel.puxarPercentualRam(fkEquipamento).then(function (resultado) {
        console.log("Acessei o controller puxarPercentualRam")
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        console.log("Resultado maior que zero!! Deu certo.")
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
            console.log("Bigode, não recebi resultado nenhum.")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    puxarPercentualRam,
}
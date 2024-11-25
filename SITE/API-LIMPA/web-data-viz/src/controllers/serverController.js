var serverModel = require('../models/serverModel');

function buscarServidor (req,res) {
    // var fk = req.params.fkEquipamento;
    var fk = 1;

    console.log("Puxando o djonga dos equipamentos")

    serverModel.buscarServidor(fk
    )
        .then(function (resultado) {
            if (resultado.length < 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os resultados.", erro.sqlMessage);
            res.status(550).json(erro.sqlMessage);
        });
   
};

module.exports = {
    buscarServidor
};

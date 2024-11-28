const aleModel = require("../models/aleModel");

function obterDados(req, res) {
    const fkEquipamento = req.params.fkEquipamento;

    console.log("Puxando os dados do equipamento:", fkEquipamento);

    aleModel.obterDados(fkEquipamento)
        .then((resultado) => {
            console.log("Resultado da consulta:", resultado);
            if (resultado.length === 0) {
                // Nenhum resultado encontrado
                res.status(204).send("Nenhum resultado encontrado!");
            } else {
                // Resultado encontrado
                res.status(200).json(resultado);
            }
        })
        .catch((erro) => {
            console.error("Erro ao obter dados:", erro);
            res.status(500).json({ error: "Erro ao obter dados." });
        });
}

function buscarServidor(req, res) {
    aleModel.buscarServidor()
        .then((resultado) => {
            console.log("Servidores encontrados:", resultado);
            if (resultado.length === 0) {
                res.status(204).send("Nenhum servidor encontrado!");
            } else {
                res.status(200).json(resultado);
            }
        })
        .catch((erro) => {
            console.error("Erro ao buscar servidores:", erro);
            res.status(500).json({ error: "Erro ao buscar servidores." });
        });
}

module.exports = {
    obterDados,
    buscarServidor
};

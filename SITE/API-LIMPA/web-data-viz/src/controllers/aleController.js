aleModel = require("../models/aleModel");

function enviarResposta(res, resultado, mensagemErro) {
    if (resultado.length === 0) {
        res.status(204).send("Nenhum resultado encontrado!");
    } else {
        res.status(200).json(resultado);
    }
}

function enviarErro(res, erro, mensagemErro) {
    console.error(mensagemErro, erro);
    res.status(500).json({ error: mensagemErro });
}

function obterDados(req, res) {
    const fkEquipamento = req.params.fkEquipamento;
    

    aleModel.obterDados(fkEquipamento)
        .then((resultado) => enviarResposta(res, resultado, "Erro ao obter dados"))
        .catch((erro) => enviarErro(res, erro, "Erro ao obter dados"));
}

function buscarServidor(req, res) {
    aleModel.buscarServidor()
        .then((resultado) => enviarResposta(res, resultado, "Erro ao buscar servidores"))
        .catch((erro) => enviarErro(res, erro, "Erro ao buscar servidores"));
}



module.exports = {
    obterDados,
    buscarServidor,
    
};

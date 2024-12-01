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

function puxarPercentualCPU(req, res) {
    var fkEquipamento = req.params.fkEquipamento

    duarteModel.puxarPercentualCPU(fkEquipamento).then(function (resultado) {
        console.log("Acessei o controller puxarPercentualCPU")
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

function puxarComparacao(req, res) {
    var fkEquipamento = req.params.fkEquipamento

    duarteModel.puxarComparacao(fkEquipamento).then(function (resultado) {
        console.log("Acessei o controller puxarComparacao")
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

function puxarSobrecargaCPU(req, res) {
    var fkEquipamento = req.params.fkEquipamento

    duarteModel.puxarSobrecargaCPU(fkEquipamento).then(function (resultado) {
        console.log("Acessei o controller puxarSobrecargaCPU")
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

function puxarSobrecargaRAM(req, res) {
    var fkEquipamento = req.params.fkEquipamento

    duarteModel.puxarSobrecargaRAM(fkEquipamento).then(function (resultado) {
        console.log("Acessei o controller puxarSobrecargaRAM")
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

function buscarServidor(req, res) {
    duarteModel.buscarServidores()
        .then(function (servidores) {
            res.status(200).json(servidores);
        });
}

function buscarTabela(req, res) {
    duarteModel.buscarTabelinha()
        .then(function (tabela) {
            res.status(200).json(tabela);
        })
        .catch(function (error) {
            console.error("Erro ao buscar dados da tabela:", error);
            res.status(500).send("Erro ao buscar dados da tabela");
        });
}

function buscarRanking(req, res) {
    duarteModel.buscarRankings()
        .then(function (ranking) {
            res.status(200).json(ranking);
        })
        .catch(function (error) {
            console.error("Erro ao buscar dados do ranking:", error);
            res.status(500).send("Erro ao buscar dados do ranking");
        });
}

module.exports = {
    puxarPercentualRam,
    puxarPercentualCPU,
    puxarComparacao,
    puxarSobrecargaCPU,
    puxarSobrecargaRAM,
    buscarServidor,
    buscarTabela,
    buscarRanking
}
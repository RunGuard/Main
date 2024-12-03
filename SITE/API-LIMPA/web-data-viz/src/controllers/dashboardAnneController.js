var dashboardAnneModel = require("../models/dashboardAnneModel.js");
const { listar } = require("./avisoController.js");

function minimoRAM(req, res) {
    dashboardAnneModel.minimoRAM()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar o mínimo de RAM.", erro.sqlMessage);
            res.status(500).json({
                mensagem: "Erro ao buscar o mínimo de RAM.",
                detalhes: erro.sqlMessage
            });
        });
}

function servidorMinimoRAM(req, res) {
    dashboardAnneModel.servidorMinimoRAM()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar o servidor com menor uso de RAM.", erro.sqlMessage);
            res.status(500).json({
                mensagem: "Erro ao buscar o servidor com menor uso de RAM.",
                detalhes: erro.sqlMessage
            });
        });
}

function servidorMinimoTempoRAM(req, res) {
    dashboardAnneModel.servidorMinimoTempoRAM()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log("Erro ao buscar o tempo em que o servidor ficou com menor uso de RAM.", erro.sqlMessage);
            res.status(500).json({
                mensagem: "Erro ao buscar o servidor com menor uso de RAM.",
                detalhes: erro.sqlMessage
            });
        });
}

function maximoRAM(req, res) {
    dashboardAnneModel.maximoRAM()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar o máximo de RAM.", erro.sqlMessage);
            res.status(500).json({
                mensagem: "Erro ao buscar o máximo de RAM.",
                detalhes: erro.sqlMessage
            });
        });
}

function servidorMaximoRAM(req, res) {
    dashboardAnneModel.servidorMaximoRAM()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar o servidor com maior uso de RAM.", erro.sqlMessage);
            res.status(500).json({
                mensagem: "Erro ao buscar o servidor com maior uso de RAM.",
                detalhes: erro.sqlMessage
            });
        });
}

function servidorMaximoTempoRAM(req, res) {
    dashboardAnneModel.servidorMaximoTempoRAM()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log("Erro ao buscar o tempo em que o servidor ficou com maior uso de RAM.", erro.sqlMessage);
            res.status(500).json({
                mensagem: "Erro ao buscar o servidor com maior uso de RAM.",
                detalhes: erro.sqlMessage
            });
        });
}

function minimoCPU(req, res) {
    dashboardAnneModel.minimoCPU()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar o mínimo de CPU.", erro.sqlMessage);
            res.status(500).json({
                mensagem: "Erro ao buscar o mínimo de CPU.",
                detalhes: erro.sqlMessage
            });
        });
}

function servidorMinimoCPU(req, res) {
    dashboardAnneModel.servidorMinimoCPU()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar o servidor com menor uso de CPU.", erro.sqlMessage);
            res.status(500).json({
                mensagem: "Erro ao buscar o servidor com menor uso de CPU.",
                detalhes: erro.sqlMessage
            });
        });
}

function servidorMinimoTempoCPU(req, res) {
    dashboardAnneModel.servidorMinimoTempoCPU()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log("Erro ao buscar o tempo em que o servidor ficou com menor uso de CPU.", erro.sqlMessage);
            res.status(500).json({
                mensagem: "Erro ao buscar o servidor com menor uso de CPU.",
                detalhes: erro.sqlMessage
            });
        });
}

function maximoCPU(req, res) {
    dashboardAnneModel.maximoCPU()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar o máximo de CPU.", erro.sqlMessage);
            res.status(500).json({
                mensagem: "Erro ao buscar o máximo de CPU.",
                detalhes: erro.sqlMessage
            });
        });
}

function servidorMaximoCPU(req, res) {
    dashboardAnneModel.servidorMaximoCPU()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar o servidor com maior uso de CPU.", erro.sqlMessage);
            res.status(500).json({
                mensagem: "Erro ao buscar o servidor com maior uso de CPU.",
                detalhes: erro.sqlMessage
            });
        });
}

function servidorMaximoTempoCPU(req, res) {
    dashboardAnneModel.servidorMaximoTempoCPU()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log("Erro ao buscar o tempo em que o servidor ficou com maior uso de CPU.", erro.sqlMessage);
            res.status(500).json({
                mensagem: "Erro ao buscar o servidor com maior uso de CPU.",
                detalhes: erro.sqlMessage
            });
        });
}

function obterServidores(req, res) {
    dashboardAnneModel.obterServidores()
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum servidor encontrado.");
            }
        })
        .catch((erro) => {
            console.error("Erro ao buscar servidores:", erro.sqlMessage || erro);
            res.status(500).json({ erro: "Erro interno ao buscar servidores." });
        });
}

function obterVariabilidadeCPU(req, res) {
    const idEquipamento = req.params.idEquipamento;

    if (!idEquipamento) {
        return res.status(400).send("ID do equipamento não fornecido.");
    }

    dashboardAnneModel.obterVariabilidadeCPU(idEquipamento)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum dado encontrado para o equipamento selecionado.");
            }
        })
        .catch((erro) => {
            console.error("Erro ao buscar variabilidade da CPU:", erro.sqlMessage || erro);
            res.status(500).json({ erro: "Erro interno ao buscar variabilidade da CPU." });
        });
}

const getServidoresComparacao1 = async (req, res) => {
    try {
        const servidores = await dashboardAnneModel.obterServidoresComp1(); 
        res.json(servidores);
    } catch (error) {
        console.error('Erro ao carregar servidores para comparação 1:', error);
        res.status(500).send('Erro ao carregar servidores.');
    }
};

function obterDadosComp1(req, res) {
    const idEquipamento = req.params.idEquipamento;

    if (!idEquipamento) {
        return res.status(400).send("ID do equipamento não fornecido.");
    }

    dashboardAnneModel.obterDadosComp1(idEquipamento)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado); 
            } else {
                res.status(204).send("Nenhum dado encontrado para o equipamento selecionado.");
            }
        })
        .catch((erro) => {
            console.error("Erro ao buscar variabilidade da CPU:", erro.sqlMessage || erro);
            res.status(500).json({ erro: "Erro interno ao buscar variabilidade da CPU." });
        });
}


const getServidoresComparacao2 = async (req, res) => {
    try {
        const servidores = await dashboardAnneModel.obterServidoresComp2(); 
        res.json(servidores);
    } catch (error) {
        console.error('Erro ao carregar servidores para comparação 2:', error);
        res.status(500).send('Erro ao carregar servidores.');
    }
};

function obterDadosComp2(req, res) {
    const idEquipamento = req.params.idEquipamento;

    if (!idEquipamento) {
        return res.status(400).send("ID do equipamento não fornecido.");
    }

    dashboardAnneModel.obterDadosComp2(idEquipamento)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado); 
            } else {
                res.status(204).send("Nenhum dado encontrado para o equipamento selecionado.");
            }
        })
        .catch((erro) => {
            console.error("Erro ao buscar variabilidade da CPU:", erro.sqlMessage || erro);
            res.status(500).json({ erro: "Erro interno ao buscar variabilidade da CPU." });
        });
}

module.exports = {
    minimoRAM,
    maximoRAM,
    minimoCPU,
    maximoCPU,
    servidorMinimoRAM,
    servidorMaximoRAM,
    servidorMinimoCPU,
    servidorMaximoCPU,
    obterServidores,
    obterVariabilidadeCPU,
    getServidoresComparacao1,
    obterDadosComp1,
    getServidoresComparacao2,
    obterDadosComp2,
    servidorMinimoTempoRAM,
    servidorMaximoTempoRAM,
    servidorMinimoTempoCPU,
    servidorMaximoTempoCPU
};

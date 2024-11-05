var database = require("../database/config");

function atualizarGrafico() {
    var instrucaoSql = `SELECT * FROM dados`;

    return database.executar(instrucaoSql);
}

module.exports = {
    atualizarGrafico,
}
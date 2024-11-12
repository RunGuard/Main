var database = require("../database/config");

function atualizarGrafico(mes1, mes2) {
    var instrucaoSql = `
    SELECT count(ia.idInformacao) AS qtdAlerta, MONTH(a.dtHora) AS mes FROM informacaoAlerta AS ia
    JOIN alerta AS a ON fkAlerta = idAlerta
    WHERE MONTH(a.dtHora) BETWEEN ${mes1} AND ${mes2}
    GROUP BY MONTH(a.dtHora)
    ORDER BY MONTH(a.dtHora) ASC`;
    return database.executar(instrucaoSql);
}

function coletarDados(mes1, mes2) {
    var instrucaoSql = `SELECT e.nomeEquipamento, count(ia.idInformacao) AS total_alerta FROM informacaoAlerta AS ia 
    JOIN dado AS d ON fkDado = idDado 
    JOIN equipamento AS e ON fkEquipamento = idEquipamento 
    JOIN alerta AS a ON fkAlerta = idAlerta 
    WHERE MONTH(a.dtHora) BETWEEN ${mes1} AND ${mes2} 
    GROUP BY e.nomeEquipamento 
    ORDER BY total_alerta DESC LIMIT 3;`

    return database.executar(instrucaoSql)
}

function graficoDetails(mes) {
    var instrucaoSql = `SELECT count(ia.idInformacao) AS qtdAlerta, DAY(a.dtHora) AS dia FROM informacaoAlerta AS ia JOIN alerta AS a ON fkAlerta = idAlerta 
    WHERE MONTH(a.dtHora) = ${mes}
    GROUP BY dia;`

    return database.executar(instrucaoSql)
}

module.exports = {
    atualizarGrafico,
    coletarDados,
    graficoDetails,
}
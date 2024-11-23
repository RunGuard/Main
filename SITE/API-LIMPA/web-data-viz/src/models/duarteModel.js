var database = require("../database/config");

function puxarPercentualRam(fkEquipamento) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function puxarPercentualRam()");
    var instrucaoSql =
        // -- SQL para buscar o último registro mais recente
        `
    SELECT memoriaPercent, dtHora as momento
        FROM dado 
            WHERE fkEquipamento = ${fkEquipamento}
        ORDER BY dtHora DESC 
    LIMIT 5;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarPercentualCPU(fkEquipamento) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function puxarPercentualCPU()");
    var instrucaoSql =
        // -- SQL para buscar o último registro mais recente
        `
    SELECT cpuPercent, dtHora as momento
        FROM dado 
            WHERE fkEquipamento = ${fkEquipamento}
        ORDER BY dtHora DESC 
    LIMIT 5;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarComparacao(fkEquipamento) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function puxarComparacao()");
    var instrucaoSql =
        // -- SQL para buscar o último registro mais recente
        `
    SELECT 
        memoriaPercent, 
        cpuPercent, 
        latencia_rede 
    FROM dado 
        WHERE fkEquipamento = ${fkEquipamento}
            ORDER BY dtHora DESC 
    LIMIT 5;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    puxarPercentualRam,
    puxarPercentualCPU,
    puxarComparacao
}
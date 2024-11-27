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
            latencia_rede, 
            dtHora 
        FROM dado 
            WHERE fkEquipamento = ${fkEquipamento}
                ORDER BY dtHora DESC 
        LIMIT 3;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarSobrecargaCPU(fkEquipamento) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function puxarSobrecargaCPU()");
    var instrucaoSql =
        // -- SQL para buscar o último registro mais recente
        `
    SELECT 
        idDado, 
        cpuPercent,
        dtHora,
            IF(cpuPercent > 80, 1, 0) AS cpuAcima80
    FROM dado
        WHERE fkEquipamento = ${fkEquipamento}
    ORDER BY dtHora ASC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// function puxarSobrecargaRAM(fkEquipamento) {
//     console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function puxarSobrecargaRAM()");
//     var instrucaoSql =
//         // -- SQL para buscar o último registro mais recente
//         `
//     SELECT 
//         idDado, 
//         ramPercent,
//         dtHora,
//             IF(ramPercent > 80, 1, 0) AS ramAcima80,
//     FROM dado
//         WHERE fkEquipamento = ${fkEquipamento} -- Substitua pelo ID do servidor específico (opcional, se necessário)
//     ORDER BY dtHora ASC;
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

module.exports = {
    puxarPercentualRam,
    puxarPercentualCPU,
    puxarComparacao,
    puxarSobrecargaCPU,
    // puxarSobrecargaRAM
}
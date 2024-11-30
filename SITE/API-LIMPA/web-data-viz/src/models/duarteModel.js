var database = require("../database/config");

function puxarPercentualRam(fkEquipamento) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function puxarPercentualRam()");
    var instrucaoSql =
        // -- SQL para buscar o último registro mais recente
        `
    SELECT memoriaPercent, dtHora as momento
        FROM dado 
        JOIN equipamento ON fkEquipamento = idEquipamento
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
        JOIN equipamento ON fkEquipamento = idEquipamento
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
        JOIN equipamento ON fkEquipamento = idEquipamento
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
    JOIN equipamento ON fkEquipamento = idEquipamento
        WHERE fkEquipamento = ${fkEquipamento}
    ORDER BY dtHora ASC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function puxarSobrecargaRAM(fkEquipamento) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function puxarSobrecargaRAM()");
    var instrucaoSql =
        // -- SQL para buscar o último registro mais recente
        `
    SELECT 
        idDado, 
        memoriaPercent,
        dtHora,
            IF(memoriaPercent > 80, 1, 0) AS ramAcima80
    FROM dado
    JOIN equipamento ON fkEquipamento = idEquipamento
        WHERE fkEquipamento = ${fkEquipamento}
    ORDER BY dtHora ASC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function buscarServidores() {
    const query = `
        SELECT idEquipamento, nomeEquipamento
        FROM equipamento;
    `;
    
    try {
        const servidores = await database.executar(query);
        return servidores;
    } catch (error) {
        throw new Error("Erro ao buscar servidores no banco: " + error.message);
    }
}

module.exports = {
    puxarPercentualRam,
    puxarPercentualCPU,
    puxarComparacao,
    puxarSobrecargaCPU,
    puxarSobrecargaRAM,
    buscarServidores
}
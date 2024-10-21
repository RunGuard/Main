var database = require("../database/config");

function listar() {
    var instrucaoSql = `SELECT * FROM equipamento LEFT JOIN dados ON fkEquipamento = idEquipamento`;

    return database.executar(instrucaoSql);
}

function listarDetalhes(id) {
    var instrucaoSql = `SELECT * FROM equipamento JOIN dados ON fkEquipamento = idEquipamento WHERE idEquipamento = ${id} LIMIT 1`;

    return database.executar(instrucaoSql);
}

function atualizarGrafico1() {
    var instrucaoSql = `SELECT 
      equipamento.nomeEquipamento, 
      dados.cpuPercent, 
      dados.memoriaPercent, 
      DATE_FORMAT(dados.dtHora, '%H:%i') as horario
    FROM dados
    JOIN equipamento ON dados.fkEquipamento = equipamento.idEquipamento
    ORDER BY dados.dtHora ASC;`;

    return database.executar(instrucaoSql);
}

function atualizarGrafico2() {
    var instrucaoSql = `SELECT 
      equipamento.nomeEquipamento, 
      dado.cpuPercent, 
      dado.memoriaPercent, 
      DATE_FORMAT(dado.dtHora, '%H:%i') as horario
    FROM dado
    JOIN equipamento ON dado.fkEquipamento = equipamento.idEquipamento
    ORDER BY dado.dtHora ASC;`;

    return database.executar(instrucaoSql);
}

function percentualRAM() {

    var instrucaoSql = `
    SELECT 
    AVG(dado.memoriaPercent) AS percentual_medio_ram
    FROM 
    dado;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function percentualCPU() {
    var instrucaoSql = `
    SELECT AVG(dado.cpuPercent) AS percentual_medio_cpu
    FROM
    dado
    `;
}

module.exports = {
    listar,
    listarDetalhes,
    atualizarGrafico1,
    percentualRAM,
    percentualCPU
};
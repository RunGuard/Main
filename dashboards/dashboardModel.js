var database = require("../database/config");

function listar() {
    var instrucaoSql = `SELECT * FROM equipamento LEFT JOIN dados ON fkEquipamento = idEquipamento`;

    return database.executar(instrucaoSql);
}

function listarDetalhes(id) {
    var instrucaoSql = `SELECT * FROM equipamento JOIN dado ON fkEquipamento = idEquipamento WHERE idEquipamento = ${id} LIMIT 1`;

    return database.executar(instrucaoSql);
}

// gráficos dashboard 1
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

// gráficos dashboard 2
function atualizarGrafico2() {
    var instrucaoSql = `SELECT 
    DATE(dtHora) AS data,
    ROUND(AVG(memoriaUsada), 2) AS media_memoria_percent 
FROM 
    dados
GROUP BY 
    DATE(dtHora) 
ORDER BY 
    data ASC;`;

    return database.executar(instrucaoSql);
}

// gráficos dashboard 3
function atualizarGrafico3() {
    const instrucaoSql = `
        SELECT 
    DATE_FORMAT(dtHora, '%Y-%m-%d %H:00:00') AS data,
    ROUND(AVG(cpuPercent), 2) AS media_cpu_percent
FROM dados
GROUP BY data
ORDER BY data ASC;
    `;
    return database.executar(instrucaoSql);
}

// médias dashboard 2
function percentualRAM() {

    var instrucaoSql = `
    SELECT 
    AVG(dados.memoriaPercent) AS percentual_medio_ram
    FROM 
    dados;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function percentualCPU() {
    var instrucaoSql = `
    SELECT AVG(dados.cpuPercent) AS percentual_medio_cpu
    FROM
    dados
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    listarDetalhes,
    atualizarGrafico1,
    atualizarGrafico2,
    atualizarGrafico3,
    percentualRAM,
    percentualCPU
};
var database = require("../database/config");

function minimoRAM() {
    var instrucaoSql = `
        SELECT 
    d.memoriaPercent AS "Menor Percentual de Uso de Memória RAM (%)"
FROM 
    dado d
JOIN 
    equipamento e ON d.fkEquipamento = e.idEquipamento
WHERE 
    MONTH(d.dtHora) = MONTH(CURDATE()) 
    AND YEAR(d.dtHora) = YEAR(CURDATE())
ORDER BY 
    d.memoriaPercent ASC
LIMIT 1;
    `;

    return new Promise(function (resolve, reject) {
        database.executar(instrucaoSql)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    resolve(resultado);
                } else {
                    reject(new Error("Nenhum resultado encontrado"));
                }
            })
            .catch(function (erro) {
                console.log("Erro ao executar a consulta:", erro);
                reject(erro);
            });
    });
}

function servidorMinimoRAM() {
    var instrucaoSql = `
        SELECT 
    e.nomeEquipamento AS "Servidor"
FROM 
    dado d
JOIN 
    equipamento e ON d.fkEquipamento = e.idEquipamento
WHERE 
    MONTH(d.dtHora) = MONTH(CURDATE()) 
    AND YEAR(d.dtHora) = YEAR(CURDATE())
ORDER BY 
    d.memoriaPercent ASC
LIMIT 1;
    `;
    return database.executar(instrucaoSql)
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao executar a consulta para servidorMinimoRAM.", erro.sqlMessage);
            throw erro;
        });
}

function servidorMinimoTempoRAM() {
    const instrucaoSql = `
        SELECT 
    e.idEquipamento,
    e.nomeEquipamento,
    MIN(d.memoriaPercent) AS minRAM,
    MIN(d.dtHora) AS data_min_ram, 
    TIMESTAMPDIFF(MINUTE, MIN(d.dtHora), NOW()) AS tempoEmMinutos
FROM 
    dado d
JOIN 
    equipamento e ON d.fkEquipamento = e.idEquipamento
WHERE 
    MONTH(d.dtHora) = MONTH(CURDATE()) 
    AND YEAR(d.dtHora) = YEAR(CURDATE())
GROUP BY 
    e.idEquipamento
ORDER BY 
    minRAM ASC
LIMIT 1;
    `;
    return database.executar(instrucaoSql)
        .catch((erro) => {
            console.error("Erro ao executar consulta SQL:", erro.sqlMessage || erro);
            throw erro;
        });
}


function maximoRAM() {
    var instrucaoSql = `
        SELECT 
    d.memoriaPercent AS "Maior Percentual de Uso de Memória RAM (%)"
FROM 
    dado d
JOIN 
    equipamento e ON d.fkEquipamento = e.idEquipamento
WHERE 
    MONTH(d.dtHora) = MONTH(CURDATE()) 
    AND YEAR(d.dtHora) = YEAR(CURDATE())
ORDER BY 
    d.memoriaPercent DESC
LIMIT 1;
    `;
    return database.executar(instrucaoSql)
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao executar a consulta para maximoRAM.", erro.sqlMessage);
            throw erro;
        });
}

function servidorMaximoRAM() {
    var instrucaoSql = `
        SELECT 
    e.nomeEquipamento AS "Servidor"
FROM 
    dado d
JOIN 
    equipamento e ON d.fkEquipamento = e.idEquipamento
WHERE 
    MONTH(d.dtHora) = MONTH(CURDATE()) 
    AND YEAR(d.dtHora) = YEAR(CURDATE())
ORDER BY 
    d.memoriaPercent DESC
LIMIT 1;
    `;
    return database.executar(instrucaoSql)
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao executar a consulta para servidorMaximoRAM.", erro.sqlMessage);
            throw erro;
        });
}

function servidorMaximoTempoRAM() {
    const instrucaoSql = `
        SELECT 
    e.idEquipamento,
    e.nomeEquipamento,
    MAX(d.memoriaPercent) AS maxRAM,
    MIN(d.dtHora) AS data_max_ram, 
    TIMESTAMPDIFF(MINUTE, MIN(d.dtHora), NOW()) AS tempoEmMinutos
FROM 
    dado d
JOIN 
    equipamento e ON d.fkEquipamento = e.idEquipamento
WHERE 
    MONTH(d.dtHora) = MONTH(CURDATE()) 
    AND YEAR(d.dtHora) = YEAR(CURDATE())
GROUP BY 
    e.idEquipamento
ORDER BY 
    maxRAM DESC
LIMIT 1;

    `;
    return database.executar(instrucaoSql)
        .catch((erro) => {
            console.error("Erro ao executar consulta SQL:", erro.sqlMessage || erro);
            throw erro;
        });
}

function minimoCPU() {
    var instrucaoSql = `
        SELECT 
    d.cpuPercent AS "Menor Percentual de Uso de CPU (%)"
FROM 
    dado d
JOIN 
    equipamento e ON d.fkEquipamento = e.idEquipamento
WHERE 
    MONTH(d.dtHora) = MONTH(CURDATE()) 
    AND YEAR(d.dtHora) = YEAR(CURDATE())
ORDER BY 
    d.cpuPercent ASC
LIMIT 1;
    `;
    return database.executar(instrucaoSql)
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao executar a consulta para minimoCPU.", erro.sqlMessage);
            throw erro;
        });
}

function servidorMinimoCPU() {
    var instrucaoSql = `
        SELECT 
    e.nomeEquipamento AS "Servidor"
FROM 
    dado d
JOIN 
    equipamento e ON d.fkEquipamento = e.idEquipamento
WHERE 
    MONTH(d.dtHora) = MONTH(CURDATE()) 
    AND YEAR(d.dtHora) = YEAR(CURDATE())
ORDER BY 
    d.cpuPercent ASC
LIMIT 1;
    `;
    return database.executar(instrucaoSql)
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao executar a consulta para servidorMinimoCPU.", erro.sqlMessage);
            throw erro;
        });
}

function servidorMinimoTempoCPU() {
    const instrucaoSql = `
        SELECT 
    e.idEquipamento,
    e.nomeEquipamento,
    MIN(d.cpuPercent) AS minCPU,
    MIN(d.dtHora) AS data_min_cpu, 
    TIMESTAMPDIFF(MINUTE, MIN(d.dtHora), NOW()) AS tempoEmMinutos
FROM 
    dado d
JOIN 
    equipamento e ON d.fkEquipamento = e.idEquipamento
WHERE 
    MONTH(d.dtHora) = MONTH(CURDATE()) 
    AND YEAR(d.dtHora) = YEAR(CURDATE())
GROUP BY 
    e.idEquipamento
ORDER BY 
    minCPU ASC
LIMIT 1;
    `;
    return database.executar(instrucaoSql)
        .catch((erro) => {
            console.error("Erro ao executar consulta SQL:", erro.sqlMessage || erro);
            throw erro;
        });
}

function maximoCPU() {
    var instrucaoSql = `
        SELECT 
    d.cpuPercent AS "Maior Percentual de Uso de CPU (%)"
FROM 
    dado d
JOIN 
    equipamento e ON d.fkEquipamento = e.idEquipamento
WHERE 
    MONTH(d.dtHora) = MONTH(CURDATE()) 
    AND YEAR(d.dtHora) = YEAR(CURDATE())
ORDER BY 
    d.cpuPercent DESC
LIMIT 1;
    `;
    return database.executar(instrucaoSql)
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao executar a consulta para maximoCPU.", erro.sqlMessage);
            throw erro;
        });
}

function servidorMaximoCPU() {
    var instrucaoSql = `
        SELECT 
    e.nomeEquipamento AS "Servidor"
FROM 
    dado d
JOIN 
    equipamento e ON d.fkEquipamento = e.idEquipamento
WHERE 
    MONTH(d.dtHora) = MONTH(CURDATE()) 
    AND YEAR(d.dtHora) = YEAR(CURDATE())
ORDER BY 
    d.cpuPercent DESC
LIMIT 1;
    `;
    return database.executar(instrucaoSql)
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao executar a consulta para servidorMaximoCPU.", erro.sqlMessage);
            throw erro;
        });
}

function servidorMaximoTempoCPU() {
    const instrucaoSql = `
        SELECT 
    e.idEquipamento,
    e.nomeEquipamento,
    MAX(d.cpuPercent) AS maxCPU,
    MAX(d.dtHora) AS data_max_cpu, 
    TIMESTAMPDIFF(MINUTE, MAX(d.dtHora), NOW()) AS tempoEmMinutos
FROM 
    dado d
JOIN 
    equipamento e ON d.fkEquipamento = e.idEquipamento
WHERE 
    MONTH(d.dtHora) = MONTH(CURDATE()) 
    AND YEAR(d.dtHora) = YEAR(CURDATE())
GROUP BY 
    e.idEquipamento
ORDER BY 
    maxCPU DESC
LIMIT 1;

    `;
    return database.executar(instrucaoSql)
        .catch((erro) => {
            console.error("Erro ao executar consulta SQL:", erro.sqlMessage || erro);
            throw erro;
        });
}

function obterServidores() {
    const instrucaoSql = `
        SELECT idEquipamento, nomeEquipamento
        FROM equipamento;
    `;

    return database.executar(instrucaoSql)
        .catch((erro) => {
            console.error("Erro ao executar consulta de servidores:", erro.sqlMessage || erro);
            throw erro;
        });
}

function obterVariabilidadeCPU(idEquipamento) {
    const instrucaoSql = `
        SELECT 
            d.dtHora AS timestamp,
            d.cpuPercent AS cpu_percent
        FROM 
            dado d
        JOIN 
            equipamento e ON d.fkEquipamento = e.idEquipamento
        WHERE 
            e.idEquipamento = ${idEquipamento}
        ORDER BY 
            d.dtHora ASC;
    `;

    return database.executar(instrucaoSql)
        .catch((erro) => {
            console.error("Erro ao executar consulta de variabilidade da CPU:", erro.sqlMessage || erro);
            throw erro;
        });
}

function obterServidoresComp1() {
    const instrucaoSql = `
        SELECT idEquipamento, nomeEquipamento
        FROM equipamento;
    `;

    return database.executar(instrucaoSql)
        .catch((erro) => {
            console.error("Erro ao executar consulta de servidores:", erro.sqlMessage || erro);
            throw erro;
        });
}

function obterDadosComp1(idEquipamento) {
    console.log("ID do equipamento recebido no back-end:", idEquipamento);

    const instrucaoSql = `
        SELECT 
    DATE_FORMAT(dtHora, '%d/%m/%Y') AS data,
    cpuPercent,
    memoriaPercent
FROM dado
WHERE fkEquipamento = ${idEquipamento}
  AND MONTH(dtHora) = MONTH(CURRENT_DATE())
  AND YEAR(dtHora) = YEAR(CURRENT_DATE())
  ORDER BY dtHora ASC  
LIMIT 7;
    `;

    return database.executar(instrucaoSql, [idEquipamento])
        .catch((erro) => {
            console.error("Erro ao executar consulta SQL:", erro.sqlMessage || erro);
            throw erro;
        });
}

function obterServidoresComp2() {
    const instrucaoSql = `
        SELECT idEquipamento, nomeEquipamento
        FROM equipamento;
    `;

    return database.executar(instrucaoSql)
        .catch((erro) => {
            console.error("Erro ao executar consulta de servidores:", erro.sqlMessage || erro);
            throw erro;
        });
}

function obterDadosComp2(idEquipamento) {
    console.log("ID do equipamento recebido no back-end:", idEquipamento);

    const instrucaoSql = `
        SELECT 
    DATE_FORMAT(dtHora, '%d/%m/%Y') AS data,
    cpuPercent,
    memoriaPercent
FROM dado
WHERE fkEquipamento = ${idEquipamento}
  AND MONTH(dtHora) = MONTH(CURRENT_DATE())
  AND YEAR(dtHora) = YEAR(CURRENT_DATE())
  ORDER BY dtHora ASC  
LIMIT 7;
    `;

    return database.executar(instrucaoSql, [idEquipamento])
        .catch((erro) => {
            console.error("Erro ao executar consulta SQL:", erro.sqlMessage || erro);
            throw erro;
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
    obterServidoresComp1,
    obterDadosComp1,
    obterServidoresComp2,
    obterDadosComp2,
    servidorMinimoTempoRAM,
    servidorMaximoTempoRAM,
    servidorMinimoTempoCPU,
    servidorMaximoTempoCPU
};

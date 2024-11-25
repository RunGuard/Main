var database = require("../database/config");

async function buscarMedidaModel(fkEquipamento) {
    const fkEquipamentoNum = fkEquipamento;

    const query = `
        SELECT 
            nomeEquipamento,
            dtHora AS momento, 
            cpuPercent AS uso_cpu, 
            memoriaPercent AS uso_memoria, 
            desvio_padrao_cpu, 
            desvio_padrao_memoria, 
            taxa_io_disco AS uso_io_total, 
            downtime AS tempo_downtime,
            indice_estabilidade, 
            eficiencia_io_cpu, 
            taxa_recuperacao
        FROM dado 
        JOIN equipamento ON fkEquipamento = idEquipamento
        WHERE fkEquipamento = ${fkEquipamentoNum}
        ORDER BY dtHora DESC LIMIT 5;
    `;

    try {
        const resultados = await database.executar(query);
        return resultados;
    } catch (error) {
        throw new Error("Erro ao buscar dados do banco: " + error.message);
    }
}

async function buscarMedidasPorPeriodoModel(fkEquipamento, mes, semana) {
    let query = `
    SELECT 
        nomeEquipamento,
        dtHora AS momento, 
        cpuPercent AS uso_cpu, 
        memoriaPercent AS uso_memoria, 
        desvio_padrao_cpu, 
        desvio_padrao_memoria, 
        taxa_io_disco AS uso_io_total, 
        downtime AS tempo_downtime,
        indice_estabilidade, 
        eficiencia_io_cpu, 
        taxa_recuperacao
    FROM dado 
    JOIN equipamento ON fkEquipamento = idEquipamento
    WHERE fkEquipamento = ${fkEquipamento} 
      AND MONTH(dtHora) = ${mes}
`;

if (semana) {
    // Verifica se a semana é entre 1 e 4
    query += `
      AND CEIL((DAY(dtHora) + DAYOFWEEK(DATE_SUB(dtHora, INTERVAL DAYOFMONTH(dtHora) - 1 DAY)) - 2) / 7) = ${semana}
    `;
} else {
    // Filtro para as semanas de 1 a 4, caso o parâmetro semana não seja passado
    query += `
      AND CEIL((DAY(dtHora) + DAYOFWEEK(DATE_SUB(dtHora, INTERVAL DAYOFMONTH(dtHora) - 1 DAY)) - 2) / 7) BETWEEN 1 AND 4
    `;
}

query += ` ORDER BY dtHora DESC LIMIT 5;`;


    try {
        const resultados = await database.executar(query);
        return resultados;
    } catch (error) {
        throw new Error("Erro ao buscar dados do banco: " + error.message);
    }
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
    buscarMedidasPorPeriodoModel,
    buscarMedidaModel,
    buscarServidores
};

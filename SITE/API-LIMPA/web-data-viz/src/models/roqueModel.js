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

async function buscarMedidasPorPeriodoModel(fkEquipamento, mes, semana = null) {
    let query = `
    SELECT 
        nomeEquipamento,
        WEEK(dtHora) AS semana,
        MONTH(dtHora) AS mes,
        AVG(cpuPercent) AS media_uso_cpu,
        AVG(memoriaPercent) AS media_uso_memoria,
        AVG(desvio_padrao_cpu) AS media_desvio_padrao_cpu,
        AVG(desvio_padrao_memoria) AS media_desvio_padrao_memoria,
        AVG(taxa_io_disco) AS media_uso_io_total,
        AVG(downtime) AS media_tempo_downtime,
        AVG(indice_estabilidade) AS media_indice_estabilidade,
        AVG(eficiencia_io_cpu) AS media_eficiencia_io_cpu,
        AVG(taxa_recuperacao) AS media_taxa_recuperacao
    FROM dado
    JOIN equipamento ON fkEquipamento = idEquipamento
    WHERE fkEquipamento = ${fkEquipamento}
`;

if (mes) {
    query += ` AND MONTH(dtHora) = ${mes} `;
}

if (semana) {
    query += ` AND WEEK(dtHora) = ${semana} `;
}

query += ` GROUP BY nomeEquipamento, semana, mes ORDER BY mes, semana DESC LIMIT 5; `;


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

var database = require("../database/config");

async function buscarMedidaModel(fkEquipamento) {

    const query = `
       SELECT 
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
    WHERE fkEquipamento = ${fkEquipamento}
    ORDER BY dtHora;

    `;

    try {
        const resultados = await database.executar(query, [fkEquipamento]);
        return resultados;
    } catch (error) {
        throw new Error("Erro ao buscar dados do banco: " + error.message);
    }
}

module.exports = {
    buscarMedidaModel
};

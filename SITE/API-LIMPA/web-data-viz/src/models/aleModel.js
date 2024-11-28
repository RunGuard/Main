const database = require("../database/config");

async function obterDados(fkEquipamento) {
    const fkEquipamentoNum = fkEquipamento;
  const sql = `
    SELECT 
      bytes_recebidos, 
      bytes_enviados, 
      pacotes_recebidos, 
      pacotes_enviados, 
      cpuPercent AS usoCPU, 
      ping, 
      DATE_FORMAT(dtHora, '%H:%i:%s') AS horario
    FROM dado
    WHERE fkEquipamento = ${fkEquipamentoNum}
    ORDER BY dtHora DESC 
    LIMIT 20;
  `;

  try {
    const resultados = await database.executar(sql);
    return resultados;
} catch (error) {
    throw new Error("Erro ao buscar dados do banco: " + error.message);
}
}

async function buscarServidor() {
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
  obterDados,
  buscarServidor
};
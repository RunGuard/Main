const database = require("../database/config");

function obterDados(fkEquipamento) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDados() , fkEquipamento");
    const instrucaoSql = `
        SELECT 
            bytes_recebidos, 
            bytes_enviados, 
            pacotes_recebidos, 
            pacotes_enviados, 
            cpuPercent AS usoCPU, 
            ping, 
            DATE_FORMAT(dtHora, '%H:%i:%s') AS momento
        FROM dado
        WHERE fkEquipamento = ${fkEquipamento}
        ORDER BY dtHora DESC 
        LIMIT 50;
    `;
    console.log("Executando a instrução SQL:", instrucaoSql);

    return database.executar(instrucaoSql, [fkEquipamento])
        .then((resultado) => {
            console.log("Resultado da query SQL:", resultado);
            return resultado;
        })
        .catch((erro) => {
            console.error("Erro ao executar query SQL:", erro);
            throw erro;
        });
}

module.exports = {
    obterDados
};

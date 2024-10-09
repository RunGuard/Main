var database = require("../database/config");

function listar() {
    var instrucaoSql = `SELECT * FROM equipamento LEFT JOIN dados ON fkEquipamento = idEquipamento`;
  
    return database.executar(instrucaoSql);
}

function listarDetalhes(id) {
    var instrucaoSql = `SELECT * FROM equipamento JOIN dados ON fkEquipamento = idEquipamento WHERE idEquipamento = ${id} LIMIT 1`;
  
    return database.executar(instrucaoSql);
}

module.exports = { 
    listar,
    listarDetalhes,
};
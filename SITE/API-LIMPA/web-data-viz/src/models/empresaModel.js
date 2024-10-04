var database = require("../database/config");

// function buscarPorId(id) {
//   var instrucaoSql = `SELECT * FROM empresa WHERE idEmpresa = ''`;

//   return database.executar(instrucaoSql);
// }

function listar() {
  var instrucaoSql = `SELECT idEmpresa, razaoSocial FROM empresa`;

  return database.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;

  return database.executar(instrucaoSql);
}

function cadastrarEmpresa(razaoSocial, cnpj) {
  var instrucaoSql = `INSERT INTO empresa (razaoSocial, cnpj) VALUES ('${razaoSocial}', '${cnpj}')`;

  return database.executar(instrucaoSql);
}

function cadastrarEquipamento(nomeEquipamento, cpuVersao, memoriaRam, sistemaOperacional, fkEmpresa) {
  var instrucaoSql = `INSERT INTO equipamento (nomeEquipamento, cpuVersao, memoriaRam, sistemaOperacional, fkEmpresa) VALUES ('${nomeEquipamento}', '${cpuVersao}', '${memoriaRam}', '${sistemaOperacional}', '${fkEmpresa}')`;

  return database.executar(instrucaoSql);
}

function autenticar(email, senha) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
  var instrucaoSql = `
      SELECT idUsuario, nome, email, cargo, fkEmpresa FROM usuario WHERE email = '${email}' AND senha = '${senha}';
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(nome, cargo, email, senha, cpf, fkEmpresa) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cargo, email, senha, cpf, fkEmpresa);
  
  var instrucaoSql = `
      INSERT INTO usuario (nome, cargo, email, senha, cpf, fkEmpresa) VALUES ('${nome}', '${cargo}', '${email}', '${senha}', '${cpf}', '${fkEmpresa}');
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
module.exports = { 
  // buscarPorId,
  listar,
  buscarPorCnpj,
  cadastrarEmpresa,
  cadastrarEquipamento,
  autenticar,
  cadastrar
};

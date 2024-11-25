const db = require("../database/config");

            function buscarServidor (fkEquipamento
            ) {
                console.log("ACESSEI O SERVER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acessoa ao banco\n\ \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarServidor():", fkEquipamento);
                
                var instrucaoSql = 

                `SELECT fkEquipamento FROM dado WHERE fkEquipamento = ${fkEquipamento}`;

                console.log("Executando a instrução SQL: \n" + instrucaoSql);
            return database.executar(instrucaoSql)
            }
               
            
            module.exports = {
                buscarServidor
            };
            
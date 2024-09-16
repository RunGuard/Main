package school.sptech.service.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.Conexao;

public class DaoEmpresa {
    public static void main(String[] args) {
        Conexao conexao = new Conexao();
        JdbcTemplate banco = conexao.getConexaoBanco();

        banco.execute("""
                CREATE TABLE IF NOT EXISTS empresa(
                id_empresa INT PRIMARY KEY AUTO_INCREMENT,
                cnpj CHAR(14) UNIQUE,
                cep CHAR(8),
                razao_social VARCHAR(45),
                telefone CHAR(9) UNIQUE,
                email VARCHAR(45) UNIQUE,
                senha VARCHAR(45)
                );
                )""");
    }
}

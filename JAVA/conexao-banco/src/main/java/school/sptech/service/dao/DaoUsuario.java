package school.sptech.service.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.Conexao;

public class DaoUsuario {
    public static void main(String[] args) {
        Conexao conexao = new Conexao();
        JdbcTemplate banco = conexao.getConexaoBanco();

        banco.execute("""
                CREATE TABLE IF NOT EXISTS usuario (
                id_usuario INT AUTO_INCREMENT,
                cpf CHAR(11) UNIQUE,
                nome VARCHAR(45),
                email VARCHAR(45) UNIQUE,
                telefone CHAR(9) UNIQUE,
                cargo VARCHAR(45),
                senha VARCHAR(45),
                fk_empresa char(14),
                
                    FOREIGN KEY (fk_empresa) REFERENCES empresa (id_empresa),
                    PRIMARY KEY (id_usuario,fk_empresa)	
                );
                )""");
    }


}

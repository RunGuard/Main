package school.sptech.service.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.Conexao;

public class DaoEquipamento {
    public static void main(String[] args) {
        Conexao conexao = new Conexao();
        JdbcTemplate banco = conexao.getConexaoBanco();

        banco.execute("""
                CREATE TABLE IF NOT EXISTS equipamento(
                id_equipamento INT AUTO_INCREMENT,
                nome_equipamento VARCHAR(45),
                sistema_operacional VARCHAR(45),
                total_disco VARCHAR(45),
                total_memoria VARCHAR(45),
                fk_empresa char(14),
                
                    FOREIGN KEY (fk_empresa) REFERENCES empresa (id_empresa),
                    PRIMARY KEY (id_equipamento)
                );
                )""");
    }
}

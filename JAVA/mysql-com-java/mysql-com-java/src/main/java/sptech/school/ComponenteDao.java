package sptech.school;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class ComponenteDao {
    Componente componente = new Componente();
    Conexao conexao = new Conexao();
    JdbcTemplate con = conexao.getConexaoDoBanco();

    public void exibir(){
        String query = "SELECT * FROM dados WHERE idDados between 700 and 800";

        List<Componente> componentes = con.query(query, new BeanPropertyRowMapper<>(Componente.class));

        for(Componente componente : componentes){
            System.out.println("+------------------+");
            System.out.println("ID: %d".formatted(componente.getIdDados()));
            System.out.println("CPU: %.1f".formatted(componente.getCpu_porcent()) + "%");
            System.out.println("Memória: %.2f".formatted(componente.getMemoria_porcent()) + "%");
            System.out.println("Memória: %.1f GB".formatted(componente.getMemoria_usada() / ((1024 * 1024 * 1024))));
            System.out.println("Data e Hota: %s".formatted(componente.getDtHora()));
            System.out.println("Equipamento: %d".formatted(componente.getFkEquipamento()));
        }
    }
}

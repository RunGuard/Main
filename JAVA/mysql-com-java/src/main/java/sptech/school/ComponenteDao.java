package sptech.school;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Scanner;

import static java.lang.Math.pow;

public class ComponenteDao {
    Conexao conexao = new Conexao();
    JdbcTemplate con = conexao.getConexaoDoBanco();
    Scanner scanner = new Scanner(System.in);

    public void exibir() {
        Boolean loop = true;
        while (loop) {
            System.out.println("""
                    +----------------------------------------------------+
                    |Selecione o serviço você deseja acessar pelo número:|
                    +----------------------------------------------------+
                    |1- Intervalo de dados                               |
                    |2- Dados em risco                                   |
                    |3- Sair                                             |
                    +----------------------------------------------------+""");
            Integer escolha = scanner.nextInt();

            if (escolha.equals(1)) {
                System.out.println("Digite o intervalo de id dos dados que você deseja acessar(Apenas números inteiros):");
                System.out.println("Primeiro dado: ");
                Integer intervalo1 = scanner.nextInt();
                System.out.println("Último dado: ");
                Integer intervalo2 = scanner.nextInt();
                String query = "SELECT * FROM dados WHERE idDados BETWEEN %d AND %d".formatted(intervalo1, intervalo2);

                List<Componente> componentes = con.query(query, new BeanPropertyRowMapper<>(Componente.class));

                for (Componente componente : componentes) {
                    System.out.println("+------------------+");
                    System.out.println("ID: %d".formatted(componente.getIdDados()));
                    System.out.println("CPU: %.1f".formatted(componente.getCpuPorcent()) + "%");
                    System.out.println("Memória: %.2f".formatted(componente.getMemoriaPorcent()) + "%");
                    System.out.println("Memória: %.1f GB".formatted(componente.getMemoriaUsada() / (pow(1024, 3))));
                    System.out.println("Data e Hota: %s".formatted(componente.getDtHora()));
                    System.out.println("Equipamento: %d".formatted(componente.getFkEquipamento()));
                    System.out.println("+------------------+");
                }
            } else if (escolha.equals(2)) {
                String query = "SELECT * FROM dados WHERE cpu_porcent > 80 OR memoria_porcent > 80";

                List<Componente> componentes = con.query(query, new BeanPropertyRowMapper<>(Componente.class));

                for (Componente componente : componentes) {
                    System.out.println("+------------------+");
                    System.out.println("ID: %d".formatted(componente.getIdDados()));
                    System.out.println("CPU: %.1f".formatted(componente.getCpuPorcent()) + "%");
                    System.out.println("Memória: %.2f".formatted(componente.getMemoriaPorcent()) + "%");
                    System.out.println("Memória usada: %.1f GB".formatted(componente.getMemoriaUsada() / (pow(1024, 3))));
                    System.out.println("Data e Hota: %s".formatted(componente.getDtHora()));
                    System.out.println("Equipamento: %d".formatted(componente.getFkEquipamento()));
                    System.out.println("+------------------+");
                }
            } else {
                System.out.println("Processo encerrado. Obrigado por confiar na RunGuard!");
                loop = false;
            }
        }
    }
}

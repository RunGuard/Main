package school.sptech.service.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.Conexao;

public class DaoDado {
        private JdbcTemplate assistente;

    public DaoDado() {
        Conexao conectarbanco = new Conexao();
        this.assistente = conectarbanco.getConexaoBanco();
    }

    public Integer consultarCpu(String verificarCpu){
        String sql = "SELECT cpu_percent FROM dado WHERE fk_equipamento = ? ORDER BY dt_hora DESC LIMIT 1";
        return assistente.queryForObject(sql, Integer.class, verificarCpu);
    }

    public Integer consultarMemoria (String verificarMemoria){
        String sql = "SELECT memoria_percent FROM dado WHERE fk_equipamento = ? ORDER BY dt_hora DESC LIMIT 1";
        return assistente.queryForObject(sql, Integer.class, verificarMemoria);
    }

    public Integer consultarDisco (String verificarDisco){
        String sql = "SELECT disco_percent FROM dado WHERE fk_equipamento = ? ORDER BY dt_hora DESC LIMIT 1";
        return assistente.queryForObject(sql, Integer.class, verificarDisco);
    }

    public Integer consultarMediaUsoCpu (String verificarMediaCpu){
        String sql = "SELECT AVG(CAST(cpu_percent AS DECIMAL(5,2))) AS media_uso_cpu FROM dado WHERE fk_equipamento = ?";
        return assistente.queryForObject(sql, Integer.class, verificarMediaCpu);
    }

    public Integer consultarFreqCpu (String verificarFreqCpu){
        String sql = "SELECT cpu_freq FROM dado WHERE fk_equipamento = ? ORDER BY dt_hora DESC LIMIT 1";
        return assistente.queryForObject(sql, Integer.class, verificarFreqCpu);
    }

    public Integer consultarMediaUsoMemoria (String verificarMediaMemoria){
        String sql = "SELECT AVG(CAST(memoria_percent AS DECIMAL(5,2))) AS media_uso_memoria FROM dado WHERE fk_equipamento = ?";
        return assistente.queryForObject(sql, Integer.class, verificarMediaMemoria);
    }

    public Integer consultarMediaUsoDisco (String verificarMediaUsoDisco){
        String sql = "SELECT AVG(CAST(disco_percent AS DECIMAL(5,2))) AS media_uso_disco FROM dado WHERE fk_equipamento = ?";
        return assistente.queryForObject(sql, Integer.class, verificarMediaUsoDisco);
    }
}


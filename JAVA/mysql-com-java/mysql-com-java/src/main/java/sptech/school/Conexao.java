package sptech.school;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.Connection;

import java.sql.DriverManager;

import java.sql.SQLException;

public class Conexao {
    private JdbcTemplate conexaoDoBanco;

    public Conexao(){
        BasicDataSource dataSource = new BasicDataSource();

        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost/runguard");
        dataSource.setUsername("martinez");
        dataSource.setPassword("SPTech#2024");

        conexaoDoBanco = new JdbcTemplate(dataSource);
    }

    public JdbcTemplate getConexaoDoBanco() {
        return conexaoDoBanco;
    }


}

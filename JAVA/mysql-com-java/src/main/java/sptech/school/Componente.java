package sptech.school;

import org.springframework.jdbc.core.JdbcTemplate;

public class Componente {
    private Integer idDados;
    private Double cpuPorcent;
    private Double memoriaPorcent;
    private Double memoriaUsada;
    private String dtHora;
    private Integer fkEquipamento;

    public Componente() {
    }

    public Componente(Integer idDados, Double cpuPorcent, Double memoriaPorcent, Double memoria_usada, String dtHora, Integer fkEquipamento) {
        this.idDados = idDados;
        this.cpuPorcent = cpuPorcent;
        this.memoriaPorcent = memoriaPorcent;
        this.memoriaUsada = memoria_usada;
        this.dtHora = dtHora;
        this.fkEquipamento = fkEquipamento;
    }

    public Integer getIdDados() {
        return idDados;
    }

    public Double getCpuPorcent() {

        return cpuPorcent;
    }

    public Double getMemoriaPorcent() {
         return memoriaPorcent;
    }

    public Double getMemoriaUsada() {
        return memoriaUsada;
    }

    public String getDtHora() {
        return dtHora;
    }

    public Integer getFkEquipamento() {
        return fkEquipamento;
    }

    public void setIdDados(Integer idDados) {
        this.idDados = idDados;
    }

    public void setCpuPorcent(Double cpuPorcent) {
        this.cpuPorcent = cpuPorcent;
    }

    public void setMemoriaPorcent(Double memoriaPorcent) {
        this.memoriaPorcent = memoriaPorcent;
    }

    public void setMemoriaUsada(Double memoriaUsada) {
        this.memoriaUsada = memoriaUsada;
    }

    public void setDtHora(String dtHora) {
        this.dtHora = dtHora;
    }

    public void setFkEquipamento(Integer fkEquipamento) {
        this.fkEquipamento = fkEquipamento;
    }
}

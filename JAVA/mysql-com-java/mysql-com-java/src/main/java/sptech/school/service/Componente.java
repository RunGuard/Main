package sptech.school;

public class Componente {
    private Integer idDados;
    private Double cpu_porcent;
    private Double memoria_porcent;
    private Double memoria_usada;
    private String dtHora;
    private Integer fkEquipamento;

    public Integer getIdDados() {
        return idDados;
    }

    public void setIdDados(Integer idDados) {
        this.idDados = idDados;
    }

    public Double getCpu_porcent() {
        return cpu_porcent;
    }

    public void setCpu_porcent(Double cpu_porcent) {
        this.cpu_porcent = cpu_porcent;
    }

    public Double getMemoria_porcent() {
        return memoria_porcent;
    }

    public void setMemoria_porcent(Double memoria_porcent) {
        this.memoria_porcent = memoria_porcent;
    }

    public Double getMemoria_usada() {
        return memoria_usada;
    }

    public void setMemoria_usada(Double memoria_usada) {
        this.memoria_usada = memoria_usada;
    }

    public String getDtHora() {
        return dtHora;
    }

    public void setDtHora(String dtHora) {
        this.dtHora = dtHora;
    }

    public Integer getFkEquipamento() {
        return fkEquipamento;
    }

    public void setFkEquipamento(Integer fkEquipamento) {
        this.fkEquipamento = fkEquipamento;
    }
}

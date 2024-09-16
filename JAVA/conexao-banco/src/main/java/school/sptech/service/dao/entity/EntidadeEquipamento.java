package school.sptech.service.dao.entity;

public class EntidadeEquipamento {
    private Integer idEquipamento;
    private String nomeEquipamento;
    private String sistemaOperacional;
    private String totalDisco;
    private String totalMemoria;
    private String fkCnpj;

    public EntidadeEquipamento() {
    }

    public EntidadeEquipamento(Integer idEquipamento, String nomeEquipamento, String sistemaOperacional, String totalDisco, String totalMemoria, String fkCnpj) {
        this.idEquipamento = idEquipamento;
        this.nomeEquipamento = nomeEquipamento;
        this.sistemaOperacional = sistemaOperacional;
        this.totalDisco = totalDisco;
        this.totalMemoria = totalMemoria;
        this.fkCnpj = fkCnpj;
    }

    // ID do Equipamento
    public Integer getIdEquipamento() {
        return idEquipamento;
    }

    public void setIdEquipamento(Integer idEquipamento) {
        this.idEquipamento = idEquipamento;
    }

    // Nome do Equipamento
    public String getNomeEquipamento() {
        return nomeEquipamento;
    }

    public void setNomeEquipamento(String nomeEquipamento) {
        this.nomeEquipamento = nomeEquipamento;
    }

    // Sistema Operacional do Equipamento
    public String getSistemaOperacional() {
        return sistemaOperacional;
    }

    public void setSistemaOperacional(String sistemaOperacional) {
        this.sistemaOperacional = sistemaOperacional;
    }

    // Total de Disco do Equipamento
    public String getTotalDisco() {
        return totalDisco;
    }

    public void setTotalDisco(String totalDisco) {
        this.totalDisco = totalDisco;
    }

    // Total de Memória do Equipamento
    public String getTotalMemoria() {
        return totalMemoria;
    }

    public void setTotalMemoria(String totalMemoria) {
        this.totalMemoria = totalMemoria;
    }

    // CNPJ da Empresa cadastrada no Equipamento
    public String getFkCnpj() {
        return fkCnpj;
    }

    public void setFkCnpj(String fkCnpj) {
        this.fkCnpj = fkCnpj;
    }

    @Override
    public String toString() {
        return "\nEquipamento{" +
                "idEquipamento=" + idEquipamento +
                ", nomeEquipamento='" + nomeEquipamento + '\'' +
                ", sistemaOperacional='" + sistemaOperacional + '\'' +
                ", totalDisco='" + totalDisco + '\'' +
                ", totalMemoria'" + totalMemoria + '\'' +
                ", fkCnpj='" + fkCnpj +
                '}';
    }
}
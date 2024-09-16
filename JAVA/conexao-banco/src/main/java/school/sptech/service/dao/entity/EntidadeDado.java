package school.sptech.service.dao.entity;

public class EntidadeDado {
    private Integer idDado;
    private String cpuFreq;
    private String cpuPercent;
    private String memoriaUsada;
    private String memoriaPercent;
    private String discoPercent;
    private String estado;
    private String fkEquipamento;
    private String fkCnpj;

    public EntidadeDado() {
    }

    public EntidadeDado(Integer idDado, String cpuFreq, String cpuPercent, String memoriaUsada, String memoriaPercent, String discoPercent, String estado, String fkEquipamento, String fkCnpj) {
        this.idDado = idDado;
        this.cpuFreq = cpuFreq;
        this.cpuPercent = cpuPercent;
        this.memoriaUsada = memoriaUsada;
        this.memoriaPercent = memoriaPercent;
        this.discoPercent = discoPercent;
        this.estado = estado;
        this.fkEquipamento = fkEquipamento;
        this.fkCnpj = fkCnpj;
    }

    // ID do Dado Coletado
    public Integer getIdDado() {
        return idDado;
    }

    public void setIdDado(Integer idDado) {
        this.idDado = idDado;
    }

    // Frequência da CPU do Dado Coletado
    public String getCpuFreq() {
        return cpuFreq;
    }

    public void setCpuFreq(String cpuFreq) {
        this.cpuFreq = cpuFreq;
    }

    // Porcentagem da CPU do Dado Coletado
    public String getCpuPercent() {
        return cpuPercent;
    }

    public void setCpuPercent(String cpuPercent) {
        this.cpuPercent = cpuPercent;
    }

    // Memória Usada do Dado Coletado
    public String getMemoriaUsada() {
        return memoriaUsada;
    }

    public void setMemoriaUsada(String memoriaUsada) {
        this.memoriaUsada = memoriaUsada;
    }

    // Porcentagem Usada do Dado Coletado
    public String getMemoriaPercent() {
        return memoriaPercent;
    }

    public void setMemoriaPercent(String memoriaPercent) {
        this.memoriaPercent = memoriaPercent;
    }

    // Porcentagem do Disco do Dado Coletado
    public String getDiscoPercent() {
        return discoPercent;
    }

    public void setDiscoPercent(String discoPercent) {
        this.discoPercent = discoPercent;
    }

    // Estado do Dado Coletado
    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    // Chave estrangeira do equipamento do qual os dados estão sendo retirados
    public String getFkEquipamento() {
        return fkEquipamento;
    }

    public void setFkEquipamento(String fkEquipamento) {
        this.fkEquipamento = fkEquipamento;
    }

    // Chave estrangeira do CNPJ da empresa do qual os dados estão sendo coletados
    public String getFkCnpj() {
        return fkCnpj;
    }

    public void setFkCnpj(String fkCnpj) {
        this.fkCnpj = fkCnpj;
    }

    @Override
    public String toString() {
        return "\nDado{" +
                "idDado=" + idDado +
                ", cpuFreq='" + cpuFreq + '\'' +
                ", cpuPercent='" + cpuPercent + '\'' +
                ", memoriaUsada='" + memoriaUsada + '\'' +
                ", memoriaPercent'" + memoriaPercent + '\'' +
                ", discoPercent'" + discoPercent + '\'' +
                ", estado'" + estado + '\'' +
                ", fkEquipamento'" + fkEquipamento + '\'' +
                ", fkCnpj='" + fkCnpj +
                '}';
    }
}


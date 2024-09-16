package school.sptech.service.dao.entity;

public class EntidadeEmpresa {

    private Integer idEmpresa;
    private String cnpj;
    private String cep;
    private String razaoSocial;
    private String telefone;
    private String email;

    public EntidadeEmpresa() {
    }

    public EntidadeEmpresa(Integer idEmpresa, String cnpj, String cep, String razaoSocial, String telefone, String email) {
        this.idEmpresa = idEmpresa;
        this.cnpj = cnpj;
        this.cep = cep;
        this.razaoSocial = razaoSocial;
        this.telefone = telefone;
        this.email = email;
    }

    // ID da Empresa
    public Integer getIdEmpresa() {
        return idEmpresa;
    }
    public void setIdEmpesa(Integer idEmpresa) {
        this.idEmpresa = idEmpresa;
    }

    // CNPJ da Empresa
    public String getCnpj() {
        return cnpj;
    }
    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    // CEP da Empresa
    public String getCep() {
        return cep;
    }
    public void setCep(String cep) {
        this.cep = cep;
    }

    // Razão Social da Empresa
    public String getRazaoSocial() {
        return razaoSocial;
    }
    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

    // Telefone da Empresa
    public String getTelefone() {
        return telefone;
    }
    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    // E-mail da Empresa
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "\nEmpresa{" +
                "idEmpresa=" + idEmpresa +
                ", cnpj='" + cnpj + '\'' +
                ", cep='" + cep + '\'' +
                ", razaoSocial='" + razaoSocial + '\'' +
                ", telefone'" + telefone + '\'' +
                ", email='" + email +
                '}';
    }
}
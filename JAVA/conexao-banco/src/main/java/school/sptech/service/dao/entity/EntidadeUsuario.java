package school.sptech.service.dao.entity;

public class EntidadeUsuario {
    private Integer idUsuario;
    private String nome;
    private String email;
    private String telefone;
    private String cargo;
    private String senha;
    private String fkCnpj;

    public EntidadeUsuario() {
    }

    public EntidadeUsuario(Integer idUsuario, String nome, String email, String telefone, String cargo, String senha, String fkCnpj) {
        this.idUsuario = idUsuario;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.cargo = cargo;
        this.senha = senha;
        this.fkCnpj = fkCnpj;
    }

    // ID do Usuário
    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    // Nome do Usuário
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    // E-mail do Usuário
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Telefone do Usuário
    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    // Cargo do Usuário
    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    // Senha do Usuário
    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    // Chave estrangeira do CNPJ da loja na qual o Usuário trabalha
    public String getFkCnpj() {
        return fkCnpj;
    }

    public void setFkCnpj(String fkCnpj) {
        this.fkCnpj = fkCnpj;
    }

    @Override
    public String toString() {
        return "\nUsuario{" +
                "idUsuario=" + idUsuario +
                ", nome='" + nome + '\'' +
                ", email='" + email + '\'' +
                ", telefone='" + telefone + '\'' +
                ", cargo'" + cargo + '\'' +
                ", senha'" + senha + '\'' +
                ", fkCnpj='" + fkCnpj +
                '}';
    }
}
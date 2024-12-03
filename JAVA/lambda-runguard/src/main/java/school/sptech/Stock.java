package school.sptech;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.IOException;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Stock {

    @JsonProperty("nome")
    private String nome;

    @JsonProperty("cpu")
    private Double cpu;

    @JsonProperty("memoria")
    private Double memoria;


    public Stock() throws IOException {
    }

    // Getters e setters

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Double getCpu() {
        return cpu;
    }

    public void setCpu(Double cpu) {
        this.cpu = cpu;
    }

    public Double getMemoria() {
        return memoria;
    }

    public void setMemoria(Double memoria) {
        this.memoria = memoria;
    }
}

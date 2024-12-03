package school.sptech;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public interface Mapper {

    public List<Stock> map(InputStream inputStream) throws IOException;

    public static Mapper obterTipoArquivo(String nomeArquivo) {
        if (nomeArquivo.contains("json")) {
            return new MapperCsv();
        } else if (nomeArquivo.contains("csv")) {
            return new MapperJson();
        } else {
            return null;
        }
    }
}

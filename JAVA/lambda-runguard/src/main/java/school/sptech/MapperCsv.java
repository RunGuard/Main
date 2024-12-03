package school.sptech;

import com.fasterxml.jackson.databind.MappingIterator;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class MapperCsv implements Mapper {

    public List<Stock> map(InputStream inputStream) throws IOException {
        CsvSchema csvSchema = CsvSchema.emptySchema().withHeader();
        CsvMapper mapper = new CsvMapper();
        MappingIterator<Stock> dados = mapper.readerFor(Stock.class).with(csvSchema).readValues(inputStream);
        return dados.readAll();
    }
}

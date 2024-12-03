package school.sptech;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class CsvWriter {

    public ByteArrayOutputStream writeCsv(List<Stock> stocks) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(outputStream, StandardCharsets.UTF_8));
        CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader("Nome", "Cpu", "Memoria"));

        for (Stock stock : stocks) {
            csvPrinter.printRecord(
                    stock.getNome(),
                    stock.getCpu(),
                    stock.getMemoria()
            );
        }

        csvPrinter.flush();
        writer.close();

        return outputStream;
    }
}

package school.sptech;

import school.sptech.service.dao.DaoDado;
import school.sptech.service.dao.entity.EntidadeDado;

import java.util.Scanner;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {
        Scanner leitor = new Scanner(System.in);

        while(true){
            System.out.println("Bem-Vindo ao Sistema de Monitoramento - VaultWise!");
            System.out.println("+-----------------------+");
            System.out.println("| Selecione uma Medição |");
            System.out.println("|-----------------------|");
            System.out.println("| 1. CPU                |");
            System.out.println("| 2. Memória            |");
            System.out.println("| 3. Disco              |");
            System.out.println("| 4. Sair               |");
            System.out.println("+-----------------------+");

            Integer Scan = leitor.nextInt();

            if(Scan == 1){
                System.out.println("Digite a FK do equipamento que deseja consultar:");
                String fkEquipamento = leitor.next();

                DaoDado sqlDado = new DaoDado();
                Integer cpuPercent = Integer.valueOf(String.valueOf(sqlDado.consultarCpu(fkEquipamento)));

                DaoDado mediaCpu = new DaoDado();
                Integer cpuMediaUso = mediaCpu.consultarMediaUsoCpu(fkEquipamento);

                DaoDado freqCpu = new DaoDado();
                Integer frequenciaCpu = freqCpu.consultarFreqCpu(fkEquipamento);

                System.out.println("+--------------------------+");
                System.out.println("| Consulte os dados:       |");
                System.out.println("+--------------------------+");
                System.out.println("| Atual uso da CPU:" + cpuPercent + "%" + "     |");
                System.out.println("+--------------------------+");
                System.out.println("| Media de uso da CPU:" + cpuMediaUso + "%" + "  |");
                System.out.println("+--------------------------+");
                System.out.println("| Frequência de CPU:" + frequenciaCpu + "MHz" + "|");
                System.out.println("+--------------------------+");


                if(cpuPercent > 80){
                    System.out.println("Verifique já o equipamento!");
                }else{
                    System.out.println("Nenhuma anormalidade detectada.");
                    System.out.println("\n");
                }
            } else if(Scan == 2){
                System.out.println("Digite a FK do equipamento que deseja consultar:");
                String fkEquipamento = leitor.next();

                DaoDado sqlDado = new DaoDado();
                Integer memoriaPercent = (sqlDado.consultarMemoria(fkEquipamento));

                DaoDado mediaDado = new DaoDado();
                Integer mediaMemoria = (mediaDado.consultarMediaUsoMemoria(fkEquipamento));


                System.out.println("+--------------------------+");
                System.out.println("| Consulte os dados:       |");
                System.out.println("+--------------------------+");
                System.out.println("| Atual uso da RAM:" + memoriaPercent + "%" + "     |");
                System.out.println("+--------------------------+");
                System.out.println("| Media de uso da RAM:" + mediaMemoria + "%" + "  |");
                System.out.println("+--------------------------+");

                if(memoriaPercent > 80){
                    System.out.println("Excesso de carga. Verifique já o equipamento!");
                }else{
                    System.out.println("Nenhuma anormalidade detectada.");
                }

            } else if(Scan == 3){
                System.out.println("Digite a FK do equipamento que deseja consultar:");
                String fkEquipamento = leitor.next();

                DaoDado sqlDado = new DaoDado();
                Integer discoPercent = (sqlDado.consultarDisco(fkEquipamento));
                System.out.println(discoPercent + "%");

                DaoDado mediaDisco = new DaoDado();
                Integer discoAvg = (mediaDisco.consultarMediaUsoDisco(fkEquipamento));

                System.out.println("+--------------------------+");
                System.out.println("| Consulte os dados:       |");
                System.out.println("+--------------------------+");
                System.out.println("| Atual uso do Disco:" + discoPercent + "%" + "   |");
                System.out.println("+-- ------------------------+");
                System.out.println("| Media de uso do Disco:" + discoAvg + "%" + "  |");
                System.out.println("+--------------------------+");

                if(discoPercent >= 80){
                    System.out.println("Disco sendo muito utilizado. Verifique já o equipamento!");
                }else{
                    System.out.println("Nenhuma anormalidade detectada.");
                }
            } else if(Scan == 4){
                System.out.println("Para verificar qualquer anormaldiade, utilize nosso sistema!");
                System.out.println("Até logo!");
                break;
            }
        }
    }
}
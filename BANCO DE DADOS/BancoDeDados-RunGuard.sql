-- CRIAÇÃO DE DATABASE
DROP DATABASE IF EXISTS runguard;
CREATE DATABASE runguard;
USE runguard;

-- CRIAÇÃO DE TABELAS
CREATE TABLE empresa (
idEmpresa int primary key auto_increment,
razaoSocial varchar(45),
cnpj char(18)
);

CREATE TABLE usuario (
idUsuario int primary key auto_increment,
nome varchar(45),
email varchar(45) unique,
senha varchar(45),
cpf varchar(14),
cargo varchar(45),
fkEmpresa int,
    constraint fkEmpresaUsuario foreign key (fkEmpresa) references empresa (idEmpresa)
);

CREATE TABLE equipamento (
idEquipamento int primary key auto_increment,
nomeEquipamento varchar(45),
cpuVersao varchar(45),
memoriaRam varchar(45),
SistemaOperacional varchar(45),
fkEmpresa int,
    constraint fkEmpresaEquipamento foreign key (fkEmpresa) references empresa (idEmpresa)
);

CREATE TABLE dado (
idDado int primary key auto_increment,
cpuPercent double,
memoriaPercent double,
memoriaUsada double,
bytes_recebidos double,
bytes_enviados double,
pacotes_recebidos double,
pacotes_enviados double,
erros_envio double,
erros_recebidos double,
pacotes_descartados_env double,
pacotes_descartados_rec double,
dtHora datetime default current_timestamp,
fkEquipamento int,
    constraint fkEquipamentoDados foreign key (fkEquipamento) references equipamento (idEquipamento)
);

CREATE TABLE alerta (
idAlerta int primary key auto_increment,
resumo varchar(256),
descricao varchar(256),
dtHora datetime default current_timestamp
);

CREATE TABLE informacaoAlerta (
idInformacao int auto_increment,
fkDado int,
fkAlerta int,
componenteAlerta varchar(45),
statusAlerta varchar(45),
    constraint fkDado foreign key (fkDado) references dado (idDado),
    constraint fkAlerta foreign key (fkAlerta) references alerta (idAlerta),
    constraint primaryKey primary key (idInformacao, fkDado, fkAlerta)
);

INSERT INTO empresa VALUES
(default, 'Uber', "112345678910111213"),
(default, '99 Táxi', "111111111122222222");

INSERT INTO equipamento VALUES 
(1, 'Servidor A', 'Intel Xeon E5', '16GB', 'Linux Ubuntu 20.04', 1),
(2, 'Servidor B', 'AMD Ryzen 7', '32GB', 'Windows Server 2019', 1),
(3, 'Servidor C', 'Intel i7 10700K', '16GB', 'Linux CentOS 8', 2),
(4, 'Servidor D', 'Intel i9 10900K', '64GB', 'Windows 10', 2),
(5, 'Servidor E', 'AMD EPYC 7742', '128GB', 'Linux Debian 10', 1);


INSERT INTO dado VALUES
(1, 75.3, 60.2, 2048.0, 10000.0, 5000.0, 1200.0, 1300.0, 3.0, 1.0, 0.0, 0.0, '2024-10-05 10:00:00', 1),
(2, 80.1, 65.4, 3072.0, 12000.0, 6000.0, 1500.0, 1600.0, 4.0, 2.0, 1.0, 1.0, '2024-10-15 10:05:00', 1),
(3, 65.4, 55.0, 1024.0, 8000.0, 4000.0, 900.0, 950.0, 2.0, 1.0, 0.0, 0.0, '2024-10-20 10:10:00', 1),
(4, 78.5, 80.0, 4096.0, 15000.0, 8000.0, 2000.0, 2100.0, 3.0, 1.0, 0.0, 1.0, '2024-10-25 10:15:00', 1),
(5, 60.0, 50.5, 5120.0, 17000.0, 7500.0, 1800.0, 1900.0, 2.0, 0.0, 1.0, 0.0, '2024-11-08 10:20:00', 1),
(6, 90.5, 70.2, 8192.0, 25000.0, 20000.0, 2200.0, 2300.0, 4.0, 3.0, 1.0, 0.0, '2024-11-10 10:25:00', 1),
(7, 70.2, 68.0, 6144.0, 22000.0, 18000.0, 2400.0, 2500.0, 3.0, 2.0, 0.0, 1.0, '2024-11-16 10:30:00', 1),
(8, 50.0, 55.0, 2048.0, 16000.0, 7000.0, 1700.0, 1800.0, 1.0, 1.0, 0.0, 0.0, '2024-11-19 10:35:00', 1),
(9, 68.2, 72.3, 4096.0, 13000.0, 9500.0, 1600.0, 1500.0, 2.0, 3.0, 1.0, 1.0, '2024-12-01 10:40:00', 1),
(10, 85.3, 75.1, 10240.0, 28000.0, 21000.0, 2700.0, 2800.0, 5.0, 3.0, 0.0, 0.0, '2024-12-01 10:45:00', 1),
(11, 80.0, 85.2, 4096.0, 19000.0, 14000.0, 2500.0, 2300.0, 4.0, 2.0, 0.0, 1.0, '2024-10-05 11:40:00', 2),
(12, 90.1, 88.5, 5120.0, 22000.0, 17000.0, 2700.0, 2600.0, 5.0, 3.0, 1.0, 0.0, '2024-10-15 11:45:00', 2),
(13, 75.3, 65.1, 3072.0, 16000.0, 12000.0, 2100.0, 2000.0, 3.0, 1.0, 1.0, 0.0, '2024-10-20 11:00:00', 2),
(14, 85.7, 90.0, 6144.0, 25000.0, 19000.0, 2300.0, 2200.0, 6.0, 2.0, 0.0, 1.0, '2024-10-25 11:05:00', 2),
(15, 60.2, 50.0, 8192.0, 18000.0, 14000.0, 2000.0, 1900.0, 4.0, 3.0, 1.0, 0.0, '2024-11-08 11:10:00', 2),
(16, 95.0, 92.1, 10240.0, 27000.0, 22000.0, 2900.0, 2800.0, 7.0, 4.0, 0.0, 0.0, '2024-11-10 11:15:00', 2),
(17, 88.0, 80.3, 4096.0, 21000.0, 16000.0, 2400.0, 2300.0, 3.0, 1.0, 1.0, 0.0, '2024-11-16 11:20:00', 2),
(18, 77.6, 70.9, 6144.0, 20000.0, 15000.0, 2300.0, 2200.0, 5.0, 2.0, 0.0, 1.0, '2024-11-19 11:25:00', 2),
(19, 68.5, 75.3, 10240.0, 30000.0, 25000.0, 3000.0, 3100.0, 4.0, 3.0, 1.0, 0.0, '2024-12-01 11:30:00', 2),
(20, 82.3, 65.7, 8192.0, 21000.0, 16000.0, 2500.0, 2400.0, 2.0, 1.0, 0.0, 0.0, '2024-12-01 11:35:00', 2),
(21, 65.4, 60.0, 2048.0, 10000.0, 5000.0, 1200.0, 1300.0, 3.0, 1.0, 0.0, 0.0, '2024-10-05 11:40:00', 3),
(22, 70.0, 72.3, 3072.0, 12000.0, 6000.0, 1500.0, 1600.0, 4.0, 2.0, 1.0, 1.0, '2024-10-15 11:45:00', 3),
(23, 55.0, 60.0, 1024.0, 8000.0, 4000.0, 900.0, 950.0, 2.0, 1.0, 0.0, 0.0, '2024-10-20 11:50:00', 3),
(24, 80.0, 85.0, 4096.0, 15000.0, 8000.0, 2000.0, 2100.0, 3.0, 1.0, 0.0, 1.0, '2024-10-25 11:55:00', 3),
(25, 60.2, 50.3, 5120.0, 17000.0, 7500.0, 1800.0, 1900.0, 2.0, 0.0, 1.0, 0.0, '2024-11-08 12:00:00', 3),
(26, 90.3, 80.2, 8192.0, 25000.0, 20000.0, 2200.0, 2300.0, 4.0, 3.0, 1.0, 0.0, '2024-11-10 12:05:00', 3),
(27, 70.1, 68.5, 6144.0, 22000.0, 18000.0, 2400.0, 2500.0, 3.0, 2.0, 0.0, 1.0, '2024-11-16 12:10:00', 3),
(28, 55.4, 60.0, 2048.0, 16000.0, 7000.0, 1700.0, 1800.0, 1.0, 1.0, 0.0, 0.0, '2024-11-19 12:15:00', 3),
(29, 75.0, 80.0, 4096.0, 13000.0, 9500.0, 1600.0, 1500.0, 2.0, 3.0, 1.0, 1.0, '2024-12-01 12:20:00', 3),
(30, 85.0, 85.5, 10240.0, 28000.0, 21000.0, 2700.0, 2800.0, 5.0, 3.0, 0.0, 0.0, '2024-12-01 12:25:00', 3);

INSERT INTO alerta (resumo, descricao) VALUES
('Alerta de alta utilização de CPU', 'A utilização da CPU ultrapassou 75%.'),
('Alerta de memória alta', 'A memória do sistema está com mais de 80% de uso.'),
('Alerta de erro na rede', 'Houve falhas de envio de pacotes na interface de rede.'),
('Alerta de pacotes descartados', 'Pacotes foram descartados devido a erro de rede.'),
('Alerta de alta utilização de CPU', 'A utilização da CPU ultrapassou 85%.'),
('Alerta de memória alta', 'A memória do sistema está com mais de 90% de uso.'),
('Alerta de tráfego de rede excessivo', 'O tráfego de rede ultrapassou 100MB em uma hora.'),
('Alerta de pacotes descartados', 'Pacotes foram descartados devido a erro de rede.'),
('Alerta de erro de envio de pacotes', 'Houve falhas de envio de pacotes na interface de rede.'),
('Alerta de baixa utilização de CPU', 'A utilização da CPU está abaixo de 30%, possível inatividade.'),
('Alerta de utilização elevada de memória', 'A memória foi usada acima de 85%.'),
('Alerta de tráfego excessivo na rede', 'O tráfego de rede aumentou acima de 50MB por minuto.');


INSERT INTO informacaoAlerta VALUES
(1, 1, 1, 'CPU', 'Crítico'),
(2, 5, 2, 'Memória', 'Crítico'),
(3, 14, 3, 'Rede', 'Alto'),
(4, 16, 4, 'Rede', 'Moderado'),
(5, 18, 1, 'CPU', 'Alto'),
(6, 24, 2, 'Memória', 'Alto'),
(7, 25, 3, 'Rede', 'Crítico'),
(8, 26, 4, 'Rede', 'Moderado');


CREATE VIEW Monitoramento AS
SELECT 
    d.idDado AS ID,
    CONCAT(d.cpuPercent, "%") AS "Porcentagem CPU",
    CONCAT(d.memoriaPercent, "%") AS "Porcentagem Memoria",
    CONCAT(d.memoriaUsada, "GB") AS "Memoria usada",
    CONCAT(d.bytes_recebidos, "GB") AS "Bytes recebidos",
    CONCAT(d.bytes_enviados, "GB") AS "Bytes enviados",
    CONCAT(d.pacotes_recebidos, "GB") AS "Pacotes recebidos",
    CONCAT(d.pacotes_enviados, "GB") AS "Pacotes enviados",
    CONCAT(d.erros_envio, "GB") AS "Erros no envio",
    CONCAT(d.erros_recebidos, "GB") AS "Erros na recepção",
    CONCAT(d.pacotes_descartados_env, "GB") AS "Pacotes de envio descartados",
    CONCAT(d.pacotes_descartados_rec, "GB") AS "Pacotes de recebimento descartados",
    d.dtHora AS "Data",
    e.nomeEquipamento AS Equipamento
FROM 
    dado AS d
JOIN 
    equipamento AS e ON d.fkEquipamento = e.idEquipamento;


-- CRIPTOGRAFIA - Explicação de como funciona
-- MUDA O DELIMITADOR DE ';' PARA '$$', POIS DENTRO DE UMA FUNÇÃO HÁ MUITAS ULTILIZAÇÕES DE ';'
DELIMITER $$

-- CRIAÇAÕ DA FUNÇÃO 'criptografia' QUE RECEBE UM TEXTO E UMA CHAVE E RETORNA O TEXTO CRIPTOGRAFADO
CREATE FUNCTION criptografia(texto VARCHAR(255), chave INT)
RETURNS VARCHAR(255) -- DEFINE OQ A FUNÇÃO RETORNA  (texto de até 255 caracteres)
DETERMINISTIC -- DEFINE QUE A A FUNÇÃO É DETERMINISTICA  (para mesmas entradas, mesmos resultados)
BEGIN
    DECLARE resultado VARCHAR(255) DEFAULT ''; -- VAR PARA ARMAZENAR O RESULTADO
    DECLARE i INT DEFAULT 1; -- CONT PARA PERCORRER O TEXTO
    DECLARE caracter_atual CHAR(1); -- VAR PARA ARMAZERNAR O CHAR ATUAL
    DECLARE trocar_valor INT DEFAULT 0; -- VAR PARA ARMAZERNAR O VALOR DO DESLOCAMENTO (cifra)

    -- INVERTE O TEXTO
    SET texto = REVERSE(texto);

    -- LOOP PARA PERCORRER CADA CHAR DO TEXTO
    WHILE i <= LENGTH(texto) DO
        -- EXTRAI O CHAR ATUAL DO TEXTO
        SET caracter_atual = SUBSTRING(texto, i, 1); 
        
        -- GERA UM VALOR DE DESLCAMENTO BASEADO NA CHAVE E ÍNDICE DO CHAR
        SET trocar_valor = (ASCII(caracter_atual) + chave + i) % 95;

        -- CONCATENA O CHAR CRIPTOGRAFADO NO RESULTADO
        SET resultado = CONCAT(resultado, CHAR(32 + trocar_valor));
        
        -- INCREMENTA O CONTADOR PARA O PRÓXIMO CHAR
        SET i = i + 1;
    END WHILE;

    -- RETORNA O TEXTO CRIPTOGRAFADO
    RETURN resultado; 
END$$

-- CRIAÇÃO DE UM TRIGGER QUE CRIPTOGRAFA A SENHA ANTES DO INSERT NA TABELA
CREATE TRIGGER criptografia_para_insersao
BEFORE INSERT ON usuario
FOR EACH ROW
BEGIN
    -- CRIPTOGRAFA A SENHA ANTES DE INSERIR O NOVO REGISTRO
    SET NEW.senha = criptografia(NEW.senha,5);
END$$

-- CRIAÇÃO DE UM TRIGGER QUE CRIPTOGRAFA A SENHA ANTES DE UM UPDATE NA TABELA
CREATE TRIGGER criptografia_na_atualizacao
BEFORE UPDATE ON usuario
FOR EACH ROW
BEGIN
    -- CRIPTOGRAFA A SENHA ANTES DE ATUALIZAR O NOVO REGISTRO
    SET NEW.senha = criptografia(NEW.senha,5);
END$$